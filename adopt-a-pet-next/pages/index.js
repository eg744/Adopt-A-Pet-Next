import Head from 'next/head';
import Image from 'next/image';
import homeStyles from '../styles/Home.module.css';
import IndexHero from '../components/indexComponents/IndexHero.js';
import { PetFinderAuthContext } from './_app';
import React, { useState, useContext, useEffect } from 'react';

export default function Home() {
	// Set, update state for recieved animals
	const [results, setResults] = useState(null);

	// Current recieved access token
	const token = useContext(PetFinderAuthContext);

	const pfurls = {
		default: 'https://api.petfinder.com/v2/animals',
		dogs: 'https://api.petfinder.com/v2/animals?type=dog',
	};

	useEffect(() => {
		// Validate token
		if (token === null) return;

		const fetchAnimals = async () => {
			const animalData = await fetch(
				// request structure: "Authorization: Bearer {YOUR_ACCESS_TOKEN}" GET https://api.petfinder.com/v2/{CATEGORY}/{ACTION}?{parameter_1}={value_1}&{parameter_2}={value_2}
				// https://www.petfinder.com/developers/v2/docs/#request-structure

				`${pfurls.default}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			const animalDataJson = await animalData.json();
			setResults(animalDataJson.animals);
		};

		fetchAnimals();
		// Update when token changes
	}, [token]);

	if (results === null) return null;

	console.log('index results', results);

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

			<h1 className={homeStyles.headline}></h1>
			<h2>Featured Animals</h2>
			<ul className={homeStyles.featured}>
				<li>Dog</li>
				<li>Cat</li>
				<li>Other</li>
			</ul>
		</div>
	);
}
