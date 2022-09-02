// root for animal page
import Link from 'next/link';
import ResultPage from '../../components/Result-page';
import React, { useContext, useEffect, useState } from 'react';
import { defaultHead } from 'next/head';
import { PetFinderAuthContext } from '../_app';
import AnimalInputField from '../../components/userInputs/AnimalInputField';
import { petfinderUrls } from '../../URLs/petfinderurls';
import { useRouter } from 'next/router';

const AnimalIndex = () => {
	// might want to think about this https://stackoverflow.com/questions/64399034/how-can-i-reuse-the-api-data-for-all-the-pages-in-react-js

	// look at this to reuse api call https://stackoverflow.com/questions/70116072/react-js-creating-a-reusable-component-to-get-api-data
	// https://dev.to/rikurouvila/clean-and-reusable-data-fetching-in-react-components-165

	// const [results, setResults] = useState(null);
	// const [isloading, setIsloading] = useState(true);
	// const [animalTypes, setAnimalTypes] = useState([]);
	// const [currentPage, setCurrentPage] = useState(1);

	// const router = useRouter();
	// const query = router.query;
	// const queriedAnimal = {
	// 	type: query.type,
	// 	breed: query.breed,
	// };
	// console.log('passed url', queriedAnimal);

	// const token = useContext(PetFinderAuthContext);

	// useEffect(() => {
	// 	if (token === null) return;
	// 	try {
	// 		const fetchAnimals = async () => {
	// 			const animalData = await fetch(
	// 				``,

	// 				// `https://api.petfinder.com/v2/animals?${petParams}`,

	// 				{
	// 					headers: {
	// 						Authorization: `Bearer ${token}`,
	// 					},
	// 				}
	// 			);
	// 			const animalDataJson = await animalData.json();
	// 			console.log(animalDataJson);
	// 			setResults(animalDataJson.animals);
	// 		};

	// 		fetchAnimals();
	// 		setIsloading(false);
	// 	} catch (event) {
	// 		//
	// 	} finally {
	// 	}
	// }, [token]);

	// if (results === null) return null;

	return (
		<div>
			<AnimalInputField />
			{/* <ResultPage results={results}></ResultPage>; */}
		</div>
	);
};
export default AnimalIndex;

// example getstaticprops (i cannot get it to work while i'm using getcontext for token)
// function Users({ users }) {
// 	// console.log(animals);

// 	const posts = await response.json();
// 	console.log('posts', posts);
// 	return {
// 		props: {
// 			users: posts,
// 		},
// 	};
// };
// export default Users;
