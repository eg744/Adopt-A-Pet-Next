// Dynamic route for animal with unique id
import React, { useState, useEffect, useContext } from 'react';
import { PetFinderAuthContext } from '../../_app';

import { useRouter } from 'next/router';

import Link from 'next/link';
import { petfinderUrls } from '../../../URLs/petfinderurls';

import AnimalInputField from '../../../components/userInputs/AnimalInputField';
import IndividualAnimalCarousel from '../../../components/carouselComponents/IndividualAnimalCarousel';
import IndividualAnimalImages from '../../../components/imgComponents/IndividualAnimalImages';
import DisplayTags from '../../../components/singleAnimalComponents/DisplayTags';
import DisplayAnimalContactInformation from '../../../components/singleAnimalComponents/DisplayAnimalContactInformation';
import pageStyles from '../../../styles/IndividualAnimalPage.module.css';

const AnimalDetails = () => {
	const token = useContext(PetFinderAuthContext);
	const router = useRouter();

	const [error, setError] = useState(null);
	const [result, setResult] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isValidRequest, setIsValidRequest] = useState(false);

	const htmlDecode = (content) => {
		let div = document.createElement('div');
		div.innerHTML = content;
		return div.childNodes.length === 0 ? '' : div.childNodes[0].nodeValue;
	};

	useEffect(() => {
		const animalId = router.query.animalID;
		// console.log(animalId);
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
				// console.log(animalData);

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
	// console.log(result);

	if (!isLoading && isValidRequest) {
		return (
			<div className={pageStyles.animalContainer}>
				<AnimalInputField />
				<div>
					<IndividualAnimalCarousel result={result} />

					<h1 className={pageStyles.animalName}>{result.name}</h1>
					<div
						className={pageStyles.description}
						dangerouslySetInnerHTML={{
							__html: htmlDecode(result.description),
						}}
					></div>
					<div>
						<DisplayTags result={result} />
					</div>
				</div>

				<div>
					<DisplayAnimalContactInformation result={result} />
				</div>
				<Link
					href={{
						pathname: `/organizations/organization/[organizationID]`,
						query: {
							organizationID: `${result.organization_id}`,
						},
					}}
				>
					<a
						className={`${pageStyles.internalLink} ${pageStyles.btn}`}
					>
						Organization or shelter: {result.organization_id}
					</a>
				</Link>
				<div className={`${pageStyles.externalLink} ${pageStyles.btn}`}>
					{' '}
					<a href={result.url}>View {result.name} on Petfinder </a>
				</div>
				<div>
					<p>ID: {result.id}</p>
				</div>
			</div>
		);
	}
};
export default AnimalDetails;
