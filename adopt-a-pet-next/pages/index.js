import Head from 'next/head';
import Image from 'next/image';
import homeStyles from '../styles/Home.module.css';
import IndexHero from '../components/indexComponents/IndexHero';
import { PetFinderAuthContext } from './_app';
import React, { useState, useContext, useEffect, useRef } from 'react';

import Carousel from '../components/carouselComponents/Carousel';

import { petfinderUrls } from '../URLs/petfinderurls';

export default function Home() {
	// Set, update state for recieved animals
	const [results, setResults] = useState(null);

	const [isLoading, setIsLoading] = useState(true);

	const [petTypesAvailable, setPetTypesAvailable] = useState([]);

	// play around with useref, see if it can replace pettypes, breeds in animalinput. Might not be the right choice.
	// const petTypeArray = useRef([]);

	// Current recieved access token
	const token = useContext(PetFinderAuthContext);

	// save multiple returned pages of results in useref?
	const retrievedPets = useRef([]);

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
				const animalDataJson = await animalData.json();

				// get more animals to populate carousel array in case too many are filtered
				// const secondPageAnimalData = await fetch(
				// 	`${petfinderUrls.default}${animalDataJson.pagination._links.next.href}`,
				// 	{
				// 		headers: {
				// 			Authorization: `Bearer ${token}`,
				// 		},
				// 	}
				// );

				setResults(animalDataJson.animals);

				setIsLoading(false);
			};

			fetchAnimals();
		} catch (error) {
			//
			console.error(error);
		}

		// Update when token changes
	}, [token]);

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
			{/* <AnimalInputField className={homeStyles.home_input_field} /> */}
			<h1 className={homeStyles.headline}></h1>
			<h2 className={homeStyles.subheadline}>New and Featured Animals</h2>
			<div className={homeStyles.carousel_container}>
				<Carousel results={results} />
			</div>
		</div>
	);
}
