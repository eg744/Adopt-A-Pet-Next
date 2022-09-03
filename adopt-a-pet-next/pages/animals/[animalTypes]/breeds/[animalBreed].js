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
	const animalType = router.query.animalTypes;
	const animalBreed = router.query.animalBreed;
	// console.log('breedpage', animalType, animalBreed);

	const token = useContext(PetFinderAuthContext);

	const [isLoading, setIsLoading] = useState(true);
	const [results, setResults] = useState([]);
	const [page, setPage] = useState(1);

	useEffect(() => {
		if (token === null) return;
		try {
			const fetchAnimals = async () => {
				const animalData = await fetch(
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
					if (animal.photos[0].full && animal.description) {
						filteredAnimals.push(animal);
					}
				});

				setResults(filteredAnimals);

				setIsLoading(false);
			};

			fetchAnimals();
		} catch (error) {
			//
			console.error(error);
		}
	}, [token, animalType, animalBreed]);

	if (!isLoading) {
		return (
			<div>
				<h1>Available results for {animalBreed}s </h1>
				<AnimalInputField />

				<ResultPage results={results} />
			</div>
		);
	} else {
		return (
			<div>
				{/* <AnimalInputField /> */}
				<h1>loading...</h1>
			</div>
		);
	}
};
export default AnimalBreedPage;
