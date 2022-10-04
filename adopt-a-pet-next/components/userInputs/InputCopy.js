import React, { Component, useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import Select from 'react-select';
import { PetFinderAuthContext } from '../../pages/_app';
import { petfinderUrls } from '../../URLs/petfinderurls';

import { Pet } from '../../helperClasses/petClass';

// https://reactjs.org/docs/forms.html
// https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams

// https://stackoverflow.com/questions/43862600/how-can-i-get-query-string-parameters-from-the-url-in-next-js

// https://www.digitalocean.com/community/tutorials/react-react-autocomplete

// == unused test input field, I don't need to validate all this myself for the most part ==

const InputField = ({ petTypeArray }) => {
	const initialLocationState = { state: '' };
	const intialAnimalState = { animal: '' };

	const token = useContext(PetFinderAuthContext);

	const USZipcodeRegex = new RegExp(/(^\d{5}$)|(^\d{5}-\d{4}$)/);

	// Possible custom error strings
	const inputErrors = {
		state: '',
		zipcode: '',
		animal: '',
	};

	const [locationState, setLocationState] = useState(initialLocationState);

	const [zipcode, setZipcodeState] = useState('');

	const [selectedAnimalState, setSelectedAnimalState] =
		useState(intialAnimalState);

	const [currentURL, setCurrentURL] = useState(
		`${petfinderUrls.types}dog/breeds`
	);

	const [animalBreedState, setAnimalBreedState] = useState();

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

	function getPetOption() {
		if (token === null) return;
		const fetchAnimals = async () => {
			const animalBreeds = await fetch(currentURL, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			const animalBreedsJson = await animalBreeds.json();
			setAnimalBreedState(animalBreedsJson.breeds);
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
		setCurrentURL(breedURL);

		getPetOption();

		console.log('input', event.value.toLowerCase());
		console.log('breedstate before', animalBreedState);

		// Occasionally animalbreedstate is undefined, I'm not sure why. Page reload fixes but it's not consistent.

		animalBreedState.map((breed) => {
			const pet = new Pet(breed.name, breed.name);

			breedsArray.push(pet);
		});

		setAvailableAnimalBreeds(breedsArray);
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
					<div>
						<label htmlFor="animal" name="animal">
							Search for an animal
						</label>
						<input
							type="text"
							value={selectedAnimalState.animal}
							onChange={handleChange}
							id="animal"
							placeholder="Search for an animal"
							autoComplete="off"
							spellCheck="false"
						></input>
					</div>
					{/* <div>
				<label htmlFor="location" name="location">
					Location
				</label>
				<input
					type="text"
					value={locationState.state}
					onChange={handleLocationChange}
					placeholder="Search with location or zip"
				></input>
			</div> */}

					{/* <div>
					<label htmlFor="attributes" name="attributes">
						attributes
					</label>
					<select value={attributes}>
						<option value="young">Young</option>
						<option value="male">male</option>
					</select>
				</div> */}
					<Link
						type="submit"
						href={{
							pathname: '/animals',
							query: selectedAnimalState.animal, // the data
						}}
					>
						<button>Go to animal Page</button>
					</Link>
					{/* using link instead <button type="submit">Submit</button> */}
				</form>

				<form className="shelterform">
					<div className="zipinput">
						<h1>City/State Lookup Tool</h1>

						<label htmlFor="zip">Type Zip Code Here </label>
						<input
							className="zipcode"
							value={zipcode}
							onChange={handleChange}
							placeholder="XXXXX"
							type="text"
							name="zipcode"
							id="zipcode"
						/>

						<label htmlFor="state">State</label>
						<input
							className={`state`}
							onChange={handleChange}
							value={locationState.state}
							type="text"
							name="state"
							disabled
							id="state"
						/>
					</div>
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

export default InputField;
