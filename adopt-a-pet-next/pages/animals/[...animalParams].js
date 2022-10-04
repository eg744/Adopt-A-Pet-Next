import React, { useEffect, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { petfinderUrls } from '../../URLs/petfinderurls';

import { PetFinderAuthContext } from '../_app';
import AnimalInputField from '../../components/userInputs/AnimalInputField';
import ResultPage from '../../components/Result-page';
import PaginationButtons from '../../components/pageComponents/PaginationButtons';
import pageStyles from '../../styles/AnimalResultPage.module.css';
// import loadingAnimalPage from '../../components/pageComponents/animalPageComponents/loadingAnimalPage';

const Slug = () => {
	const router = useRouter();
	const token = useContext(PetFinderAuthContext);

	const [isLoading, setIsLoading] = useState(true);
	const [data, setData] = useState(null);

	const [results, setResults] = useState([]);

	const [isValidRequest, setIsValidRequest] = useState(false);
	const [error, setError] = useState(null);

	const [currentValidQuery, setCurrentValidQuery] = useState(null);

	useEffect(() => {
		const getValidQueries = () => {
			const currentAnimalRoute = [];

			for (let key in router.query) {
				// No empty/undefined params. Can accept many valid query params
				if (router.query.hasOwnProperty(key)) {
					if (
						typeof router.query[key] === 'string' &&
						router.query[key] !== '' &&
						router.query[key] !== 'any'
					) {
						currentAnimalRoute.push({
							key: key,
							value: router.query[key],
						});
					}
				}
			}

			// combined 2 functions here. both necessary in useeffect without unecessary dependencies.
			let pfUrl = petfinderUrls.animals;

			currentAnimalRoute.map((query) => {
				pfUrl +=
					`${query.key}` +
					'=' +
					validFurryScalesOther(`${query.value}`) +
					'&';
			});
			// limit={default: 20}

			setCurrentValidQuery(pfUrl);
		};
		getValidQueries();
	}, [router.query]);

	// Regex to make valid request when animal type is 'small & furry', 'scales, fins, & other' to 'small-furry', 'scales-fins-other'
	function validFurryScalesOther(string) {
		let newString = string.replace(/\s/g, '');
		newString = newString.replace(/&/g, '-');
		newString = newString.replace(/,/g, '-');
		return newString;
	}

	const handleNextPageChange = () => {
		const nextPage = data.pagination._links.next.href;

		const newAnimalPage = petfinderUrls.default + nextPage;

		setCurrentValidQuery(newAnimalPage);
	};

	const handlePreviousPageChange = () => {
		const previousPage = data.pagination._links.previous.href;

		const newAnimalPage = petfinderUrls.default + previousPage;
		setCurrentValidQuery(newAnimalPage);
	};

	useEffect(() => {
		if (token === null) return;
		try {
			const fetchAnimals = async () => {
				const animalData = await fetch(currentValidQuery, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});

				if (animalData.status !== 200) {
					setIsValidRequest(false);
					setIsLoading(false);
					return;
				}

				const animalDataJson = await animalData.json();
				setData(animalDataJson);

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
	}, [token, currentValidQuery]);

	// Might want something like this to clean up jsx
	// const PageText = (text) => {
	// 	return (
	// 		<div className="animalPageConditionText">
	// 			<h1>{text}</h1>
	// 			<AnimalInputField />
	// 		</div>
	// 	);
	// };

	// Look at different ways of conditionally rendering. This if/else chain is functional but I don't like it.
	if (!isValidRequest && !isLoading) {
		return (
			<div>
				<h1 className={pageStyles.searchResultHeader}>
					Not a valid request. Please search for something else.
				</h1>
				<AnimalInputField />
			</div>
		);
	} else if (isLoading) {
		return (
			<div>
				<h1 className={pageStyles.searchResultHeader}>Loading...</h1>
			</div>
		);
	} else if (!isLoading && results.length < 1) {
		return (
			<div>
				<h1 className={pageStyles.searchResultHeader}>
					No results found for your search. Please search again.
				</h1>
				<AnimalInputField />
			</div>
		);
	} else if (!isLoading) {
		return (
			<div>
				<AnimalInputField />

				<h1 className={pageStyles.searchResultHeader}>
					Animals matching your search:
				</h1>

				<ResultPage results={results} />
				<PaginationButtons
					data={data}
					handleNextPageChange={handleNextPageChange}
					handlePreviousPageChange={handlePreviousPageChange}
				/>
			</div>
		);
	}
};
export default Slug;
