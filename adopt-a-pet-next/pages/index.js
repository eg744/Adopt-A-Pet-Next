import Head from 'next/head';
import Image from 'next/image';
import homeStyles from '../styles/Home.module.css';
import IndexHero from '../components/indexComponents/IndexHero';
import { PetFinderAuthContext } from './_app';
import React, { useState, useContext, useEffect } from 'react';

import InputField from '../components/userInputs/AnimalInputField';
import { Pet } from '../helperClasses/petClass';
// import FeaturedPets from '../components/FeaturedPets';
import Carousel from '../components/carouselComponents/Carousel';

import ResultCard from '../components/Result-card';

import { petfinderUrls } from '../URLs/petfinderurls';

export default function Home() {
	// Set, update state for recieved animals
	const [results, setResults] = useState(null);

	const [isLoading, setIsLoading] = useState(true);

	const [petTypesAvailable, setPetTypesAvailable] = useState([]);

	// Current recieved access token
	const token = useContext(PetFinderAuthContext);

	useEffect(() => {
		if (token === null) return;
		try {
			const fetchAnimals = async () => {
				const animalData = await fetch(
					// request structure: "Authorization: Bearer {YOUR_ACCESS_TOKEN}" GET https://api.petfinder.com/v2/{CATEGORY}/{ACTION}?{parameter_1}={value_1}&{parameter_2}={value_2}
					// https://www.petfinder.com/developers/v2/docs/#request-structure

					`${petfinderUrls.animals}`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				const animalTypes = await fetch(`${petfinderUrls.types}`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				const animalDataJson = await animalData.json();
				const animalTypesJson = await animalTypes.json();

				setResults(animalDataJson.animals);
				setPetTypesAvailable(animalTypesJson.types);
				setIsLoading(false);
			};

			fetchAnimals();
		} catch (error) {
			//
			console.error(error);
		} finally {
		}

		// Update when token changes
	}, [token]);
	let petTypeArray = [];
	// Pet objects to pass as options in Select
	petTypesAvailable.map((pettype) => {
		const pet = new Pet(pettype.name, pettype.name);
		petTypeArray.push(pet);
	});

	// react select not updating correctly check this https://www.youtube.com/watch?v=KCC_Gspa7Oc
	console.log('index results', results);
	console.log('index types', petTypesAvailable);

	if (isLoading) {
		return (
			<div className={homeStyles.container}>
				<Head>
					<title>Adopt-A-Pet </title>
					<meta
						name="keywords"
						content="pet adoption, adopt-a-pet, petfinder"
					/>
					<link
						rel="icon"
						href="\assets\aapTitleLogoTransparent.png"
					/>
				</Head>
				<IndexHero />
				<div>loading...</div>
			</div>
		);
	}
	return (
		<div className={homeStyles.container}>
			<Head>
				<title>Adopt-A-Pet </title>
				<meta
					name="keywords"
					content="pet adoption, adopt-a-pet, petfinder"
				/>
				<link rel="icon" href="\assets\aapTitleLogoTransparent.png" />
			</Head>
			<IndexHero />
			{/* <Select
				options={petTypeArray}
				placeholder="Select animal type..."
			/> */}
			<InputField
				className={homeStyles.home_input_field}
				petTypeArray={petTypeArray}
			/>
			<h1 className={homeStyles.headline}></h1>
			<h2>Featured Animals</h2>
			{/*  */}
			<Carousel results={results} />
			{/* {results.map((result) => {

				// return <FeaturedPets key={result.id} result={result} />;
			})} */}
			<ul className={homeStyles.featured}>
				<li>Dog</li>
				<li>Cat</li>
				<li>Other</li>
			</ul>
		</div>
	);
}
