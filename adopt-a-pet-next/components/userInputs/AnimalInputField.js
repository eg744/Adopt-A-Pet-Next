import React, { Component, useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import Select from 'react-select';
import Async, { useAsync } from 'react-select/async';
import { PetFinderAuthContext } from '../../pages/_app';
import { petfinderUrls } from '../../URLs/petfinderurls';

import { Pet } from '../../helperClasses/petClass';

const AnimalInputField = ({ petTypeArray }) => {
	const token = useContext(PetFinderAuthContext);

	const [currentURL, setCurrentURL] = useState(
		`${petfinderUrls.types}dog/breeds`
	);

	const [availableAnimalBreeds, setAvailableAnimalBreeds] = useState([]);

	const [isSelected, setIsSelected] = useState(false);

	// Check for any errors, set flag
	const inputValid = (inputErrors) => {
		let valid = true;

		Object.values(inputErrors).map((error) => {
			if (error.length > 0) valid = false;
		});

		return valid;
	};

	const handleSubmit = (event) => {
		// Do not reload page/submit
		event.preventDefault();

		if (inputValid(inputErrors)) {
			console.log('submitting');
		} else {
			console.error('form invalid');
		}
	};

	const handleChange = (event) => {
		// event.preventDefault();

		// form's input name, event.target.value = entered value
		const { name, value } = event.target;

		let errors = { ...inputErrors };

		// Extendable switch to validate and update state
		switch (name) {
			case 'animal':
				errors.animal =
					value.length < 3
						? 'Please enter at least 3 characters'
						: '';

				break;

			case 'zipcode':
				errors.zipcode = USZipcodeRegex.test(value)
					? ''
					: 'Invalid Zipcode';

				break;

			default:
				break;
		}
		setSelectedAnimalState({ errors, [name]: value });
		setZipcodeState({ errors, [name]: value });
	};

	function getPetOption(url) {
		if (token === null) return;
		const fetchAnimals = async () => {
			const animalBreeds = await fetch(url, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			const animalBreedsJson = await animalBreeds.json();
			const breedsArray = [];
			animalBreedsJson.breeds.map((breed) => {
				breedsArray.push({
					label: `${breed.name}`,
					value: `${breed.name.toLowerCase()}`,
				});
			});
			setAvailableAnimalBreeds(breedsArray);
		};
		fetchAnimals();
	}

	function getURL(e) {
		return `${petfinderUrls.types}${e.value.toLowerCase()}/breeds`;
	}

	const handleTypeSelectChange = (event) => {
		// https://stackoverflow.com/questions/59226253/update-a-component-with-onchange-react-hooks
		const breedsArray = [];

		const breedURL = getURL(event);

		getPetOption(breedURL);

		console.log('input', event.value.toLowerCase());

		// Occasionally animalbreedstate is undefined, I'm not sure why. Page reload fixes but it's not consistent.

		setIsSelected(true);
	};

	// May link to animalindex, pass props to grid from here. not sure yet
	if (isSelected) {
		return (
			<div>
				<form className="animalform" onSubmit={handleSubmit}>
					<Select
						options={petTypeArray}
						placeholder="Select animal type..."
						onChange={handleTypeSelectChange}
					/>
					<Select
						options={availableAnimalBreeds}
						placeholder="Select or type animal breed..."
						// onChange={handleSelectChange}
					/>

					<Link
						type="submit"
						href={{
							pathname: '/animals',
							// query: selectedAnimalState.animal, // the data
						}}
					>
						<button>Go to animal Page</button>
					</Link>
				</form>
			</div>
		);
	} else {
		return (
			<Select
				options={petTypeArray}
				placeholder="Select animal type..."
				onChange={handleTypeSelectChange}
			/>
		);
	}
};

export default AnimalInputField;
