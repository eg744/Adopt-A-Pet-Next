import React, { useEffect, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { petfinderUrls } from '../../URLs/petfinderurls';

import { PetFinderAuthContext } from '../_app';
import AnimalInputField from '../../components/userInputs/AnimalInputField';
import ResultPage from '../../components/Result-page';
import pageStyles from '../../styles/PageButtons.module.css';
// import loadingAnimalPage from '../../components/pageComponents/animalPageComponents/loadingAnimalPage';

const Slug = () => {
	const router = useRouter();
	const token = useContext(PetFinderAuthContext);

	const { animalType, animalBreed, location } = router.query;

	const [isLoading, setIsLoading] = useState(true);
	const [data, setData] = useState(null);

	const [results, setResults] = useState([]);

	const [isValidRequest, setIsValidRequest] = useState(false);
	const [error, setError] = useState(null);

	const [currentValidQuery, setCurrentValidQuery] = useState(null);

	const [currentPage, setCurrentPage] = useState(1);

	console.log('slugroute', router);

	useEffect(() => {
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

			// return currentRoutes;

			let pfUrl = petfinderUrls.animals;

			currentRoutes.map((query) => {
				pfUrl += `${query.key}` + '=' + `${query.value}` + '&';
			});

			setCurrentValidQuery(pfUrl);
		};
		getValidQueries();
		// const queryUrl = () => {
		// 	let pfUrl = petfinderUrls.animals;
		// 	const queries = getValidQueries();
		// queries.map((query) => {
		// 	pfUrl += `${query.key}` + '=' + `${query.value}` + '&';
		// });

		// 	// Changing state instead of returning for now.

		// 	setCurrentValidQuery(pfUrl);
		// };
		// queryUrl();
	}, [router.query]);

	const handleNextPageChange = () => {
		// setCurrentPage((previousPage) => previousPage + 1);
		const nextPage = data.pagination._links.next.href;

		const newAnimalPage = petfinderUrls.default + nextPage;
		console.log('nextpage', newAnimalPage);
		setCurrentValidQuery(newAnimalPage);
	};

	const handlePreviousPageChange = () => {
		// setCurrentPage((previousPage) => previousPage + 1);
		const previousPage = data.pagination._links.previous.href;

		const newAnimalPage = petfinderUrls.default + previousPage;
		setCurrentValidQuery(newAnimalPage);
	};

	const PaginationButtons = () => {
		try {
			// These links may not exist
			// const nextPage =
			// 	typeof nextPage == 'undefined'
			// 		? ''
			// 		: data.pagination._links.next.href;

			const totalPages = data.pagination.total_pages;
			const currentPage = data.pagination.current_page;

			let nextPage;

			if (typeof nextPage == 'undefined' && totalPages > 1) {
				nextPage = data.pagination._links.next.href;
			}
			console.log(nextPage);

			// console.log('previous', previousPage);

			setCurrentPage(currentPage);

			let previousPage;
			if (currentPage > 1) {
				previousPage = data.pagination._links.previous.href;
			}
			// Ugly if return chain. Not sure what best practice is.
			if (
				typeof nextPage !== 'undefined' &&
				typeof previousPage !== 'undefined'
			) {
				return (
					<div className={pageStyles.paginationButtons}>
						<a>
							<button
								className={pageStyles.previousButton}
								onClick={handlePreviousPageChange}
							>
								Previous Page
							</button>
						</a>
						<div>
							Page {currentPage} of {totalPages}
						</div>
						<a>
							<button
								className={pageStyles.nextButton}
								onClick={handleNextPageChange}
							>
								Next Page
							</button>
						</a>
					</div>
				);
			} else if (
				typeof nextPage !== 'undefined' &&
				typeof previousPage == 'undefined'
			) {
				return (
					<div className={pageStyles.paginationButtons}>
						<a>
							<div>
								Page {currentPage} of {totalPages}
							</div>
							<button
								className={pageStyles.nextButton}
								onClick={handleNextPageChange}
							>
								Next Page
							</button>
						</a>
					</div>
				);
			} else if (
				typeof previousPage !== 'undefined' &&
				typeof nextPage == 'undefined'
			) {
				return (
					<div className={pageStyles.paginationButtons}>
						<a>
							<button
								className={pageStyles.previousButton}
								onClick={handlePreviousPageChange}
							>
								Previous Page
							</button>
						</a>
						<div>
							Page {currentPage} of {totalPages}
						</div>
					</div>
				);
			} else {
				return (
					<div className={pageStyles.paginationButtons}>
						<div>
							Page {currentPage} of {totalPages}
						</div>
					</div>
				);
			}
		} catch (error) {
			console.error(error);
		}
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
	}, [token, currentValidQuery]);
	// }, [token, router.query, currentValidQuery]);

	// Might want something like this to clean up jsx
	// const PageText = (text) => {
	// 	return (
	// 		<div className="animalPageConditionText">
	// 			<h1>{text}</h1>
	// 			<AnimalInputField />
	// 		</div>
	// 	);
	// };

	// Look at different ways of conditionally rendering. This if/else chain is functional but bad.
	if (!isValidRequest && !isLoading) {
		return (
			<div>
				<h1>Not a valid request. Please search for something else.</h1>
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
				<h1>No results found for your search. Please search again.</h1>
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
				<PaginationButtons />
			</div>
		);
	}
};
export default Slug;
