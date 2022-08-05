// Working fetch from api- does not use getStaticProps

import { useState, useContext, useEffect } from 'react';

import Resultpage from '/components/Result-page';
import { PetFinderAuthContext } from './_app';

// This function allows for api calls using the authcontext, does not use getStatic/getServerside props
const displayAnimal = () => {
	// Set, update state for recieved animals
	const [results, setResults] = useState(null);

	// Current recieved access token
	const token = useContext(PetFinderAuthContext);

	useEffect(() => {
		// Validate token
		if (token === null) return;

		const fetchAnimals = async () => {
			const animalData = await fetch(
				// `https://api.petfinder.com/v2/animals?location=${location}`
				'https://api.petfinder.com/v2/animals?type=dog',
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			const animalDataJson = await animalData.json();
			console.log('fetchanimal animalindex', animalDataJson);
			setResults(animalDataJson.animals);
		};

		fetchAnimals();
		// Update when token changes
	}, [token]);
	if (results === null) return null;

	return (
		<div>
			<Resultpage results={results} />
		</div>
	);
};
export default displayAnimal;
