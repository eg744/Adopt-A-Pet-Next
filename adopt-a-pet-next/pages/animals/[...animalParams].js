import React, { useEffect, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { petfinderUrls } from '../../URLs/petfinderurls';

import { PetFinderAuthContext } from '../_app';
import AnimalInputField from '../../components/userInputs/AnimalInputField';
import ResultPage from '../../components/Result-page';
import loadingAnimalPage from '../../components/pageComponents/animalPageComponents/loadingAnimalPage';

const Slug = () => {
	const router = useRouter();
	const token = useContext(PetFinderAuthContext);

	const animalType = router.query.animalTypes;
	const animalBreed = router.query.animalBreed;
	const location = router.query.location;

	const [isLoading, setIsLoading] = useState(true);
	const [results, setResults] = useState([]);
	// const [currentQuery, setCurrentQuery] = useState([]);
	const [isValidRequest, setIsValidRequest] = useState(false);
	const [error, setError] = useState(null);
	const [page, setPage] = useState(1);

	console.log('slugroute', router);
	const getValidQueries = () => {
		const currentRoutes = [];

		for (let key in router.query) {
			// No empty/undefined params. Can accept many valid query params
			if (router.query.hasOwnProperty(key)) {
				if (
					typeof router.query[key] === 'string' &&
					router.query[key] !== '' &&
					router.query[key] !== 'any'
				) {
					currentRoutes.push({
						key: key,
						value: router.query[key],
					});
				}
			}
		}

		return currentRoutes;
	};

	useEffect(() => {
		const queryUrl = () => {
			let pfUrl = petfinderUrls.animals;
			const queries = getValidQueries();
			queries.map((query) => {
				pfUrl += `${query.key}` + '=' + `${query.value}` + '&';
			});

			return pfUrl;
		};
		const myQuery = queryUrl();

		if (token === null) return;
		try {
			const fetchAnimals = async () => {
				const animalData = await fetch(myQuery, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				if (animalData.status !== 200) {
					setIsValidRequest(false);
					return;
				}
				console.log(animalData);

				const animalDataJson = await animalData.json();
				// console.log(animalDataJson);
				const filteredAnimals = [];
				animalDataJson.animals.map((animal) => {
					if (
						// No images sometimes filter too much. Not sure if I want to have a placeholder. Description required.
						// animal.photos &&
						// animal.photos[0] &&
						animal.description
					) {
						filteredAnimals.push(animal);
					}
				});
				setIsValidRequest(true);
				setResults(filteredAnimals);

				setIsLoading(false);
			};

			fetchAnimals();
		} catch (error) {
			setError(error);
			console.error(error);
		}
	}, [token, router.query, isValidRequest]);

	// Might want something like this to clean up jsx
	// const PageText = (text) => {
	// 	return (
	// 		<div className="animalPageConditionText">
	// 			<h1>{text}</h1>
	// 			<AnimalInputField />
	// 		</div>
	// 	);
	// };

	// Look at different ways of conditionally rendering. This if/else chain is functional but ugly.
	if (!isValidRequest) {
		return (
			<div>
				<h1>Not a valid request. Please search for something else</h1>
				<AnimalInputField />
			</div>
		);
	} else if (isLoading) {
		return (
			<div>
				<h1>Loading...</h1>
			</div>
		);
	} else if (!isLoading && results.length < 1) {
		return (
			<div>
				<h1>No results found for your search. Please search again</h1>
				<AnimalInputField />
			</div>
		);
	} else if (!isLoading) {
		return (
			<div>
				<AnimalInputField />

				<h1>Animals matching your search</h1>

				<ResultPage results={results} />
			</div>
		);
	}
};
export default Slug;
