import React from 'react';
import { useEffect, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { petfinderUrls } from '../../../URLs/petfinderurls';
import { PetFinderAuthContext } from '../../_app';
import AnimalInputField from '../../../components/userInputs/AnimalInputField';
import ResultPage from '../../../components/Result-page';

function AnimalTypeIndex() {
	const router = useRouter();
	console.log(router);
	const animalType = router.query.animalTypes;
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
					`${petfinderUrls.animals}type=${animalType}&location=${location}`,
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
	}, [token, animalType, location]);

	return (
		<div>
			{isLoading ? (
				<h1>loading...</h1>
			) : (
				<div>
					<h1>Available results for {animalType}s </h1>
					<AnimalInputField />

					<ResultPage results={results} />
				</div>
			)}
		</div>
	);
}

export default AnimalTypeIndex;
