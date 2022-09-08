import React from 'react';
import { useEffect, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { petfinderUrls } from '../../../../URLs/petfinderurls';
import { PetFinderAuthContext } from '../../../_app';
import AnimalInputField from '../../../../components/userInputs/AnimalInputField';
import ResultPage from '../../../../components/Result-page';

const AnimalBreedPage = () => {
	const router = useRouter();
	console.log(router);
	const currentRoutes = [];
	// console.log(router.query);
	router.query.foreach((route) => {
		// currentRoutes.push(route);
		console.log(route);
	});
	console.log(currentRoutes);
	const animalType = router.query.animalTypes;
	const animalBreed = router.query.animalBreed;
	const location = router.query.location;

	const token = useContext(PetFinderAuthContext);

	const [isLoading, setIsLoading] = useState(true);
	const [results, setResults] = useState([]);
	const [page, setPage] = useState(1);

	useEffect(() => {
		if (token === null) return;
		try {
			const fetchAnimals = async () => {
				const animalData = await fetch(
					// `${petfinderUrls.animals}type=${animalType}&breed=${animalBreed}&location=${location}`,
					`${petfinderUrls.animals}type=${animalType}&breed=${animalBreed}`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				const animalDataJson = await animalData.json();
				console.log(animalDataJson.animals);
				const filteredAnimals = [];
				animalDataJson.animals.map((animal) => {
					if (
						animal.photos &&
						animal.photos[0] &&
						animal.description
					) {
						filteredAnimals.push(animal);
					}
				});

				setResults(filteredAnimals);
				console.log(results);

				setIsLoading(false);
			};

			fetchAnimals();
		} catch (error) {
			//
			console.error(error);
		}
	}, [token, animalType, animalBreed, location]);

	if (isLoading) {
		return (
			<div>
				<h1>Loading...</h1>
			</div>
		);
	} else if (!isLoading && results.length <= 1) {
		return (
			<div>
				<h1>No results found for your search. Please search again</h1>
				<AnimalInputField />
			</div>
		);
	} else if (!isLoading) {
		return (
			<div>
				<h1>Available results for {animalBreed}s breedpage</h1>
				<AnimalInputField />

				<ResultPage results={results} />
			</div>
		);
	}

	// if (isLoading) {
	// 	return (
	// 		<div>
	// 			<h1>Available results for {animalBreed}s breedpage</h1>
	// 			<AnimalInputField />

	// 			<ResultPage results={results} />
	// 		</div>
	// 	);
	// } else if (results.length <= 1) {
	// 	return (
	// 		<div>
	// 			<h1>No results found for your search. Please search again</h1>
	// 			<AnimalInputField />
	// 		</div>
	// 	);
	// } else {
	// 	return (
	// 		<div>
	// 			<h1>Loading...</h1>
	// 		</div>
	// 	);
	// }
};
export default AnimalBreedPage;
