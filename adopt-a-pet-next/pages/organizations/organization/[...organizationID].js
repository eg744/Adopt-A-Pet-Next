import React, { useEffect, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { petfinderUrls } from '../../../URLs/petfinderurls';
import { PetFinderAuthContext } from '../../_app';
import IndividualAnimalCarousel from '../../../components/carouselComponents/IndividualAnimalCarousel';
import DisplayOrgContactInformation from '../../../components/pageComponents/organizationPageComponents/DisplayOrgContactInformation';
import pageStyles from '../../../styles/IndividualAnimalPage.module.css';

import ShelterInputField from '../../../components/userInputs/ShelterInputField';

const OrganizationID = () => {
	const token = useContext(PetFinderAuthContext);
	const router = useRouter();

	const [isLoading, setIsLoading] = useState(true);
	const [isValidRequest, setIsValidRequest] = useState(false);
	const [result, setResult] = useState([]);
	const [page, setPage] = useState(1);
	const organizationId = router.query.organizationID;

	useEffect(() => {
		if (token === null) return;
		try {
			const fetchShelters = async () => {
				const shelterData = await fetch(
					`${petfinderUrls.organization}${organizationId}`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				const shelterDataJson = await shelterData.json();
				setResult(shelterDataJson.organization);
				console.log(shelterDataJson);

				setIsLoading(false);
			};

			fetchShelters();
		} catch (error) {
			//
			console.error(error);
		}
	}, [token, router.query.organizationID]);

	if (!isLoading) {
		return (
			<div className={pageStyles.animalContainer}>
				<ShelterInputField />
				<div>
					<h1>{result.name}</h1>
					<p>{result.mission_statement}</p>
					<IndividualAnimalCarousel result={result} />
				</div>
				<h2>Contact information:</h2>
				<DisplayOrgContactInformation result={result} />
				<div className={pageStyles.internalLink}>
					<Link
						href={{
							pathname: `/animals/[animalParams]`,
							query: {
								organization: `${result.id.toLowerCase()}`,
							},
						}}
					>
						<a>View animals at {result.name}</a>
					</Link>
					<div className={pageStyles.externalLink}>
						<a href={result.url}>
							View this organization on Petfinder
						</a>
					</div>
				</div>
			</div>
		);
	}
};
export default OrganizationID;

// example petpage
// const AnimalDetails = () => {
// 	const token = useContext(PetFinderAuthContext);
// 	const router = useRouter();

// 	const [error, setError] = useState(null);
// 	const [result, setResult] = useState(null);
// 	const [isLoading, setIsLoading] = useState(true);
// 	const [isValidRequest, setIsValidRequest] = useState(false);

// 	const htmlDecode = (content) => {
// 		let div = document.createElement('div');
// 		div.innerHTML = content;
// 		return div.childNodes.length === 0 ? '' : div.childNodes[0].nodeValue;
// 	};

// 	useEffect(() => {
// 		const animalId = router.query.animalID;
// 		// console.log(animalId);
// 		if (token === null) return;

// 		try {
// 			const getPetById = async () => {
// 				const animalData = await fetch(
// 					`${petfinderUrls.animal}${animalId}`,
// 					{
// 						headers: {
// 							Authorization: `Bearer ${token}`,
// 						},
// 					}
// 				);
// 				if (animalData.status !== 200) {
// 					setIsValidRequest(false);
// 					return;
// 				}
// 				// console.log(animalData);

// 				const animalDataJson = await animalData.json();

// 				setIsValidRequest(true);
// 				setResult(animalDataJson.animal);

// 				setIsLoading(false);
// 			};
// 			getPetById();
// 		} catch (error) {
// 			setError(error);
// 			console.error(error);
// 		}
// 	}, [token, router.query]);
// 	// console.log(result);

// 	if (!isLoading && isValidRequest) {
// 		return (
// 			<div className={pageStyles.animalContainer}>
// 				<div>
// 					<IndividualAnimalCarousel result={result} />

// 					<h1>{result.name}</h1>
// 					<div
// 						className={pageStyles.description}
// 						dangerouslySetInnerHTML={{
// 							__html: htmlDecode(result.description),
// 						}}
// 					></div>
// 					<div>
// 						<DisplayTags result={result} />
// 						{/* <h3>{result.name} is:</h3>
// 						<ul>
// 							{result.tags.map((tag, index) => (
// 								<AnimalTags key={index} tag={tag} />
// 							))}
// 						</ul> */}
// 					</div>
// 				</div>

// 				<div>
// 					<DisplayAnimalContactInformation result={result} />
// 					{/* <h2>Contact Information:</h2>
// 					<p>
// 						Email: <div>{result.contact.email}</div>
// 					</p>
// 					<p>
// 						Phone: <div>{result.contact.phone}</div>
// 					</p> */}
// 				</div>
// 				<div className={pageStyles.externalLink}>
// 					{' '}
// 					<a href={result.url}>View {result.name} on Petfinder </a>
// 				</div>
// 				<div>
// 					<p>ID: {result.id}</p>
// 					<p>Organization: {result.organization_id}</p>
// 				</div>
// 			</div>
// 		);
// 	}
// };
