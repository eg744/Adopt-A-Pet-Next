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
				// console.log(shelterDataJson);

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
			<section className={pageStyles.animalContainer}>
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
			</section>
		);
	}
};
export default OrganizationID;
