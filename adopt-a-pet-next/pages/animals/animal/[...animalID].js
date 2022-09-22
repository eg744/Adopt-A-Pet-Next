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
	const animalID = router.query;

	const [error, setError] = useState(null);
	const [results, setResults] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isValidRequest, setIsValidRequest] = useState(false);

	// Route animalID specified by filename [animalID]

	// return obj, empty during pre-rendering if does not use server side rendering

	useEffect(() => {
		const animalId = router.query.animalID;
		console.log(animalId);
		if (token === null) return;

		try {
			const getPetById = async () => {
				// const fetchAnimal = async () => {

				// };
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
			};
			getPetById();
		} catch (error) {
			setError(error);
			console.error(error);
		}
	}, [token, router.query]);
	console.log(results);

	return (
		<div>
			unique animal ID: {results.animal.id}
			<div>
				<Link href="/">Go Home</Link>
			</div>
		</div>
	);
};
export default AnimalDetails;
