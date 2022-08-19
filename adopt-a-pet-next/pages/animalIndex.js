// import { useState, useContext, useEffect } from 'react';

// import Resultpage from '/components/Result-page';
// import { PetFinderAuthContext } from './_app';

// const animalIndex = () => {
// 	// Temp location (zip)
// 	const location = '90210';

// 	// Set, update state for recieved animals
// 	const [results, setResults] = useState(null);

// 	// Current recieved access token
// 	const token = useContext(PetFinderAuthContext);

// 	useEffect(() => {
// 		// Validate token
// 		if (token === null) return;

// 		const fetchAnimals = async () => {
// 			const animalData = await fetch(
// 				// `https://api.petfinder.com/v2/animals?location=${location}`
// 				'https://api.petfinder.com/v2/animals?type=dog',
// 				{
// 					headers: {
// 						Authorization: `Bearer ${token}`,
// 					},
// 				}
// 			);
// 			const animalDataJson = await animalData.json();
// 			console.log('animalindex', animalDataJson);
// 			setResults(animalDataJson.animals);
// 		};
// 		fetchAnimals();
// 		// Update when token changes
// 	}, [token]);
// 	if (results === null) return null;

// 	return (
// 		<div>
// 			<Resultpage results={results} />
// 		</div>
// 	);
// };
// export default animalIndex;
