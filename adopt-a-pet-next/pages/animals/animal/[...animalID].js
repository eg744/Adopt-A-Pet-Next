// Dynamic route for animal with unique id
import React, { useState, useEffect, useContext } from 'react';
import { PetFinderAuthContext } from '../../_app';

import { useRouter } from 'next/router';

import Link from 'next/link';
import { petfinderUrls } from '../../../URLs/petfinderurls';

// Router can display route parameter(animal id)

const AnimalDetails = () => {
	const token = useContext(PetFinderAuthContext);
	const router = useRouter();
	const { animalID } = router.query;
	console.log(animalID);

	const [error, setError] = useState(null);
	const [results, setResults] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isValidRequest, setIsValidRequest] = useState(false);

	// Route animalID specified by filename [animalID]
	const animalId = router.query.animalID;
	console.log(animalId);
	// return obj, empty during pre-rendering if does not use server side rendering

	useEffect(() => {
		const getPetById = async () => {
			try {
				if (token === null) return;

				const animalData = await fetch(
					`${petfinderUrls.animal}${animalId}`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				if (animalData.status !== 200) {
					setIsValidRequest(false);
					return;
				}
				console.log(animalData);

				const animalDataJson = await animalData.json();

				setIsValidRequest(true);
				setResults(animalDataJson);

				setIsLoading(false);

				fetchAnimals();
			} catch (error) {
				setError(error);
				console.error(error);
			}
			getPetById();
		};
	}, [token, animalId]);

	return (
		<div>
			unique animal ID: {animalId}
			<div>
				<Link href="/">Go Home</Link>
			</div>
		</div>
	);
};
export default AnimalDetails;
