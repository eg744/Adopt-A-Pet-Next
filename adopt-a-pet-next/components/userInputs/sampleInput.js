import React, { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import Select from 'react-select';
import { PetFinderAuthContext } from '../../pages/_app';
import { petfinderUrls } from '../../URLs/petfinderurls';

const ShelterInputField = () => {
	const token = useContext(PetFinderAuthContext);

	const [petTypesAvailable, setPetTypesAvailable] = useState([]);
	const [currentAnimalType, setCurrentAnimalType] = useState('');
	const [currentAnimalBreed, setCurrentAnimalBreed] = useState('');

	const [availableAnimalBreeds, setAvailableAnimalBreeds] = useState([]);

	const [isSelected, setIsSelected] = useState(false);

	const [isValidSelection, setIsValidSelection] = useState(false);
	const [queryUrl, setQueryUrl] = useState('');

	const [zipcode, setZipcode] = useState('');

	// == unused test input field, I don't need to validate all this myself for the most part ==

	// Check for any errors, set flag
	const inputValid = (zip) => {
		const isValidUSZipcode = new RegExp(/(^\d{5}$)|(^\d{5}-\d{4}$)/);
		let valid = true;

		if (isValidUSZipcode.test(zip)) {
			setZipcode(zip);
		}

		return valid;
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log('entered', event.target.value);

		if (inputValid(event.target.value)) {
			console.log('submitting', event.target.value);
		}
	};

	const handleChange = (event) => {
		// form's input name, event.target.value = entered value

		console.log(zipcode);
	};

	const getshelterURL = (event) => {
		return `${
			petfinderUrls.organizations
		}${event.value.toLowerCase()}/breeds`;
	};

	return (
		<div>
			<form className="shelter" onSubmit={handleSubmit}>
				<label htmlFor="zip">Please enter Zip code</label>
				<input
					className="zip"
					// value={zipcode}
					placeholder="XXXXX"
					type="text"
					name="zip"
					id="zip"
					// onChange={handleChange}
				/>
				<input
					className="search"
					// value={zipcode}
					placeholder="search"
					type="text"
					name="search"
					id="search"
					// onChange={handleChange}
				/>

				<Link
					href={{
						// Add path, look for org structure
						pathname: `/organizations/`,
					}}
				>
					<button type="submit">Search for shelters</button>
				</Link>
			</form>
		</div>
	);
};

export default ShelterInputField;
