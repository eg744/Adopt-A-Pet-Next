import React, { useState, useContext, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Select from 'react-select';
import { PetFinderAuthContext } from '../../pages/_app';
import { petfinderUrls } from '../../URLs/petfinderurls';

const AnimalInputField = ({ petTypeArray }) => {
	const token = useContext(PetFinderAuthContext);

	// const router = useRouter();

	const [currentURL, setCurrentURL] = useState(
		`${petfinderUrls.types}dog/breeds`
	);
	const [currentAnimalType, setCurrentAnimalType] = useState('');
	const [currentAnimalBreed, setCurrentAnimalBreed] = useState('');

	const [availableAnimalBreeds, setAvailableAnimalBreeds] = useState([]);

	const [isSelected, setIsSelected] = useState(false);

	//
	const [isValidSelection, setIsValidSelection] = useState(false);
	const [queryUrl, setQueryUrl] = useState('');
	// unsure about useref
	// const breedArray = useRef([]);

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
		console.log('breed', currentAnimalBreed);
		console.log('type', currentAnimalType);

		// May want these for future form inputs
		// if (inputValid(inputErrors)) {
		// 	console.log('submitting');
		// } else {
		// 	console.error('form invalid');
		// }
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

	const getPetOption = (url) => {
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
				// Select options for breed types
				breedsArray.push({
					label: `${breed.name}`,
					value: `${breed.name.toLowerCase()}`,
				});
			});
			setAvailableAnimalBreeds(breedsArray);
		};
		fetchAnimals();
	};

	const getPetBreedURL = (event) => {
		return `${petfinderUrls.types}${event.value.toLowerCase()}/breeds`;
	};
	const getAnimalQueryUrl = (breed) => {
		// returning without the petfinder url
		// return `${petfinderUrls.animals}type=${currentAnimalType}&breed=${breed}`;
		return `type=${currentAnimalType}&breed=${breed}`;
	};

	const handleTypeSelectChange = (event) => {
		setAvailableAnimalBreeds([]);
		setCurrentAnimalType(event.value.toLowerCase());
		console.log(currentAnimalType);

		const breedURL = getPetBreedURL(event);
		getPetOption(breedURL);

		setIsSelected(true);
	};

	const handleBreedSelectChange = (event) => {
		// let breed = getAnimalQueryUrl(event.value);
		let breed = event.value;
		// remove spaces
		breed = breed.replace(/\s/g, '');
		console.log(breed);

		setCurrentAnimalBreed(breed);

		// setQueryUrl(query);
		// console.log('query', query);
	};

	if (isSelected) {
		return (
			<div>
				<form className="animalform" onSubmit={handleSubmit}>
					<Select
						autoFocus
						Value={`${currentAnimalType}`}
						options={petTypeArray}
						placeholder="Select animal type..."
						onChange={handleTypeSelectChange}
					/>
					<Select
						options={availableAnimalBreeds}
						placeholder={`Please select or search for ${currentAnimalType} breeds`}
						onChange={handleBreedSelectChange}
					/>

					<Link
						href={{
							pathname: '/animals/[animalTypes]/[animalBreeds]',
							query: {
								type: currentAnimalType,
								breed: currentAnimalBreed,
							},
						}}
					>
						<button type="submit">Search for animal</button>
					</Link>
				</form>
			</div>
		);
	} else {
		return (
			<div>
				<p>What kind of animal are you looking for?</p>
				<Select
					defaultValue={`${currentAnimalType}`}
					options={petTypeArray}
					placeholder="Select animal type..."
					onChange={handleTypeSelectChange}
				/>
			</div>
		);
	}
};

export default AnimalInputField;
