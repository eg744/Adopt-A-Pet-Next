import React from 'react';
import { useEffect, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { petfinderUrls } from '../../../../URLs/petfinderurls';
import { PetFinderAuthContext } from '../../../_app';
import AnimalInputField from '../../../../components/userInputs/AnimalInputField';
import ResultPage from '../../../../components/Result-page';

function AnimalTypePage() {
	const router = useRouter();
	console.log(router);
	const animalType = router.query.animalTypes;
	const animalBreed = router.query.animalBreed;

	const token = useContext(PetFinderAuthContext);

	const [isLoading, setIsLoading] = useState(true);
	const [results, setResults] = useState([]);
	const [page, setPage] = useState(1);

	useEffect(() => {
		if (token === null) return;
		try {
			const fetchAnimals = async () => {
				const animalData = await fetch(
					`${petfinderUrls.animals}type=${animalType}`,
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

				setIsLoading(false);
			};

			fetchAnimals();
		} catch (error) {
			//
			console.error(error);
		}
	}, [token, animalType, animalBreed]);

	return (
		<div>
			{isLoading ? (
				<h1>loading...</h1>
			) : (
				<div>
					<h1>Available results for {animalBreed}s </h1>
					<AnimalInputField />

					<ResultPage results={results} />
				</div>
			)}
		</div>
	);
}

export default AnimalTypePage;
