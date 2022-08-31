import React, { useEffect, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { petfinderUrls } from '../../../../URLs/petfinderurls';
import { PetFinderAuthContext } from '../../../_app';
import AnimalInputField from '../../../../components/userInputs/AnimalInputField';

function AnimalBreedPage() {
	const router = useRouter();
	console.log(router);
	const animalType = router.query.animalTypes;
	const animalBreed = router.query.animalBreed;

	const token = useContext(PetFinderAuthContext);

	const [isLoading, setIsLoading] = useState(true);

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
				console.log(animalDataJson);

				// setResults(animalDataJson.animals);
				// setPetTypesAvailable(animalTypesJson.types);
				setIsLoading(false);
			};

			fetchAnimals();
		} catch (error) {
			//
			console.error(error);
		}
	}, [token]);

	return (
		<div>
			<AnimalInputField />
			<h1>dynamicanimalbreedpage</h1>
		</div>
	);
}
export default AnimalBreedPage;
