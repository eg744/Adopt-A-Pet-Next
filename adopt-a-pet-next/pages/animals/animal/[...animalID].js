// Dynamic route for animal with unique id
import React, { useState, useEffect, useContext } from 'react';
import { PetFinderAuthContext } from '../../_app';

import { useRouter } from 'next/router';

import Link from 'next/link';
import { petfinderUrls } from '../../../URLs/petfinderurls';

import IndividualAnimalCarousel from '../../../components/carouselComponents/IndividualAnimalCarousel';
import IndividualAnimalImages from '../../../components/imgComponents/IndividualAnimalImages';
// import AnimalTags from '../../../components/singleAnimalComponents/AnimalTags';
import DisplayTags from '../../../components/singleAnimalComponents/DisplayTags';
import DisplayAnimalContactInformation from '../../../components/singleAnimalComponents/DisplayAnimalContactInformation';
import pageStyles from '../../../styles/IndividualAnimalPage.module.css';

// Router can display route parameter(animal id)

const AnimalDetails = () => {
	const token = useContext(PetFinderAuthContext);
	const router = useRouter();
	const animalID = router.query;

	const [error, setError] = useState(null);
	const [result, setResult] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isValidRequest, setIsValidRequest] = useState(false);

	// Route animalID specified by filename [animalID]

	// return obj, empty during pre-rendering if does not use server side rendering

	const htmlDecode = (content) => {
		let div = document.createElement('div');
		div.innerHTML = content;
		return div.childNodes.length === 0 ? '' : div.childNodes[0].nodeValue;
	};

	useEffect(() => {
		const animalId = router.query.animalID;
		console.log(animalId);
		if (token === null) return;

		try {
			const getPetById = async () => {
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
				setResult(animalDataJson.animal);

				setIsLoading(false);
			};
			getPetById();
		} catch (error) {
			setError(error);
			console.error(error);
		}
	}, [token, router.query]);
	console.log(result);

	if (!isLoading && isValidRequest) {
		return (
			<div className={pageStyles.animalContainer}>
				<div>
					<IndividualAnimalCarousel result={result} />

					<h1>{result.name}</h1>
					<div
						className={pageStyles.description}
						dangerouslySetInnerHTML={{
							__html: htmlDecode(result.description),
						}}
					></div>
					<div>
						<DisplayTags result={result} />
						{/* <h3>{result.name} is:</h3>
						<ul>
							{result.tags.map((tag, index) => (
								<AnimalTags key={index} tag={tag} />
							))}
						</ul> */}
					</div>
				</div>

				<div>
					<DisplayAnimalContactInformation result={result} />
					{/* <h2>Contact Information:</h2>
					<p>
						Email: <div>{result.contact.email}</div>
					</p>
					<p>
						Phone: <div>{result.contact.phone}</div>
					</p> */}
				</div>
				<div className={pageStyles.externalLink}>
					{' '}
					<a href={result.url}>View {result.name} on Petfinder </a>
				</div>
				<div>
					<p>ID: {result.id}</p>
					<p>Organization: {result.organization_id}</p>
				</div>
			</div>
		);
	}
};
export default AnimalDetails;
