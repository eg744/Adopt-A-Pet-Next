import React, { useEffect, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { petfinderUrls } from '../../../URLs/petfinderurls';
import { PetFinderAuthContext } from '../../_app';
import ResultPage from '../../../components/Result-page';

import ShelterInputField from '../../../components/userInputs/ShelterInputField';

const OrganizationID = () => {
	const token = useContext(PetFinderAuthContext);

	const [isLoading, setIsLoading] = useState(true);
	const [results, setResults] = useState([]);
	const [page, setPage] = useState(1);

	useEffect(() => {
		if (token === null) return;
		try {
			const fetchShelters = async () => {
				const animalData = await fetch(
					`${petfinderUrls.organizations}`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				const shelterDataJson = await animalData.json();
				console.log(shelterDataJson);
				const filteredAnimals = [];
				// animalDataJson.animals.map((animal) => {
				// 	if (
				// 		animal.photos &&
				// 		animal.photos[0] &&
				// 		animal.description
				// 	) {
				// 		filteredAnimals.push(animal);
				// 	}
				// });

				setResults(filteredAnimals);

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
			<ShelterInputField />
			dynamic Organization id page{' '}
		</div>
	);
};
export default OrganizationID;
