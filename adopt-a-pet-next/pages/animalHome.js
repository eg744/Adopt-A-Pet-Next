import { useEffect, useState, useContext } from 'react';
import Head from 'next/head';

import Resultpage from '/components/Result-page';
import { PetFinderAuthContext } from './_app';

const animalHome = () => {
	// Temp location (zip)
	const location = '90210';
	const [results, setResults] = useState(null);

	// Current recieved access token
	const token = useContext(PetFinderAuthContext);

	useEffect(() => {
		// Validate token
		if (token === null) return;

		const requestAnimals = async () => {
			const animalData = await fetch(
				`https://api.petfinder.com/v2/animals/${location}`
			);
		};
	});

	return (
		<div>
			<Head>
				<title>Animal Home Page</title>
			</Head>
			<h1>animal home page</h1>
		</div>
	);
};
export default animalHome;
