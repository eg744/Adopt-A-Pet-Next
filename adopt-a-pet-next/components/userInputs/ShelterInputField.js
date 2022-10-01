import React, { useState, useContext, useEffect, useRef } from 'react';
import Link from 'next/link';
import Select from 'react-select';
import { PetFinderAuthContext } from '../../pages/_app';
import { petfinderUrls } from '../../URLs/petfinderurls';
import inputStyles from '../../styles/AnimalInput.module.css';

const AnimalInputField = () => {
	const token = useContext(PetFinderAuthContext);

	const [isSelected, setIsSelected] = useState(false);
	const [organizationsAvailable, setOrganizationsAvailable] = useState([]);

	const [requestRedirect, setRequestRedirect] = useState(false);
	const [linkPathName, setLinkPathName] = useState('/animals');
	const [location, setLocation] = useState('');

	// Mostly just gets location, doesn't need to make calls but I might want it to do more in the future.

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

	return (
		<div className={inputStyles.shelterContainer}>
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
