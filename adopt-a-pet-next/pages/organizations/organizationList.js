import React, { useEffect, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { petfinderUrls } from '../../URLs/petfinderurls';
import { PetFinderAuthContext } from '../_app';
import ResultPage from '../../components/Result-page';
import ShelterInputField from '../../components/userInputs/ShelterInputField';

const OrganizationIndex = () => {
	const token = useContext(PetFinderAuthContext);

	const [isLoading, setIsLoading] = useState(true);
	const [results, setResults] = useState([]);
	const [page, setPage] = useState(1);

	useEffect(() => {
		if (token === null) return;
		try {
			const fetchShelters = async () => {
				const shelterData = await fetch(
					`${petfinderUrls.organizations}`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				const shelterDataJson = await shelterData.json();
				console.log(shelterDataJson);
				console.log(shelterDataJson.pagination._links.next);

				setIsLoading(false);
			};

			fetchShelters();
		} catch (error) {
			//
			console.error(error);
		}
	}, [token]);

	return (
		<div>
			<h1>Search for animal shelters in your area</h1>
			<ShelterInputField />
		</div>
	);
};
export default OrganizationIndex;
