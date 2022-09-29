import React, { useEffect, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { petfinderUrls } from '../../URLs/petfinderurls';
import { PetFinderAuthContext } from '../_app';
// import OrganizationInformation from '../../components/pageComponents/organizationPageComponents/OrganizationInformation';
import OrganizationInformation from '../../components/pageComponents/organizationPageComponents/OrganizationInformation';

import ShelterInputField from '../../components/userInputs/ShelterInputField';
import PaginationButtons from '../../components/pageComponents/PaginationButtons';
import pageStyles from '../../styles/AnimalResultPage.module.css';

const OrganizationIndex = () => {
	const token = useContext(PetFinderAuthContext);
	const router = useRouter();

	const [isValidRequest, setIsValidRequest] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [results, setResults] = useState([]);
	const [data, setData] = useState([]);
	const [currentValidQuery, setCurrentValidQuery] = useState(null);
	const [page, setPage] = useState(1);

	useEffect(() => {
		const getValidQueries = () => {
			const currentOrganizationRoute = [];

			for (let key in router.query) {
				if (router.query.hasOwnProperty(key)) {
					if (
						typeof router.query[key] === 'string' &&
						router.query[key] !== ''
					) {
						currentOrganizationRoute.push({
							key: key,
							value: router.query[key],
						});
					}
				}
			}

			let pfUrl = petfinderUrls.organizations;

			currentOrganizationRoute.map((query) => {
				pfUrl += `${query.key}` + '=' + `${query.value}` + '&';
			});
			console.log('orgurl', pfUrl);
			// limit={default: 20}

			setCurrentValidQuery(pfUrl);
		};
		getValidQueries();
	}, [router.query]);

	useEffect(() => {
		if (token === null) return;
		try {
			const fetchShelters = async () => {
				const shelterData = await fetch(`${currentValidQuery}`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				if (shelterData.status !== 200) {
					setIsValidRequest(false);
					setIsLoading(false);
					return;
				}

				const shelterDataJson = await shelterData.json();
				setData(shelterDataJson);

				// console.log(shelterDataJson.pagination._links.next);

				setResults(shelterDataJson.organizations);

				setIsValidRequest(true);
				setIsLoading(false);
			};

			fetchShelters();
		} catch (error) {
			//
			console.error(error);
		}
	}, [token, currentValidQuery]);

	const handleNextPageChange = () => {
		const nextPage = data.pagination._links.next.href;
		const newOrganizationPage = petfinderUrls.default + nextPage;
		setCurrentValidQuery(newOrganizationPage);
	};

	const handlePreviousPageChange = () => {
		const previousPage = data.pagination._links.previous.href;

		const newOrganizationPage = petfinderUrls.default + previousPage;
		setCurrentValidQuery(newOrganizationPage);
	};

	if (!isValidRequest && !isLoading) {
		return (
			<div>
				<h1 className={pageStyles.searchResultHeader}>
					Not a valid request. Please search for something else.
				</h1>
				<ShelterInputField />
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
				<ShelterInputField />
			</div>
		);
	} else if (!isLoading) {
		return (
			<div>
				<ShelterInputField />

				<h1 className={pageStyles.searchResultHeader}>
					Shelters and organizations matching your search:
				</h1>
				<OrganizationInformation results={results} />

				<PaginationButtons
					data={data}
					handleNextPageChange={handleNextPageChange}
					handlePreviousPageChange={handlePreviousPageChange}
				/>
			</div>
		);
	}
};
export default OrganizationIndex;
