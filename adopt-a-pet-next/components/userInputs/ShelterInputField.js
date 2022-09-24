import React, { useState, useContext, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Select from 'react-select';
import { PetFinderAuthContext } from '../../pages/_app';
import { petfinderUrls } from '../../URLs/petfinderurls';
import inputStyles from '../../styles/AnimalInput.module.css';

const AnimalInputField = () => {
	const token = useContext(PetFinderAuthContext);

	const router = useRouter();

	const [isSelected, setIsSelected] = useState(false);
	const [organizationsAvailable, setOrganizationsAvailable] = useState([]);

	const [requestRedirect, setRequestRedirect] = useState(false);
	const [linkPathName, setLinkPathName] = useState('/animals');
	const [location, setLocation] = useState('');

	// useEffect(() => {
	// 	if (token === null) return;
	// 	const fetchOrganizations = async () => {
	// 		const returnedOrgs = await fetch(`${petfinderUrls.organizations}`, {
	// 			headers: {
	// 				Authorization: `Bearer ${token}`,
	// 			},
	// 		});
	// 		const orgs = [];
	// 		const returnedOrgsJson = await returnedOrgs.json();

	// 	};

	// 	fetchOrganizations();
	// }, [token]);

	const handleLocationChange = (event) => {
		const location = event.target.value;
		setLocation(location);
	};

	// const organizationPageRedirect = (event) => {
	// 	event.preventDefault();
	// 	router.push({
	// 		pathname: `/organizations/[organizationList]`,

	// 		query: {
	// 			location: location,
	// 		},
	// 	});
	// };

	return (
		<div>
			<form
				className={inputStyles.animalInput}
				// onSubmit={organizationPageRedirect}
			>
				<p className={inputStyles.inputHeader}>
					Search for shelters and organizations in your area
				</p>

				<input
					className={inputStyles.inputLocation}
					placeholder="Please enter location (city, state, or ZIP)..."
					type="text"
					name="search"
					id="search"
					onChange={handleLocationChange}
				/>

				<Link
					href={{
						pathname: `/organizations/[organizationList]`,

						query: {
							location: location,
						},
					}}
				>
					<button className={inputStyles.inputLocation} type="submit">
						Search for shelters
					</button>
				</Link>
			</form>
		</div>
	);
};

export default AnimalInputField;
