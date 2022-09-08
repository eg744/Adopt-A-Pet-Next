import React, { useState, useContext, useEffect, useRef } from 'react';
import Link from 'next/link';
import Select from 'react-select';
import { PetFinderAuthContext } from '../../pages/_app';
import { petfinderUrls } from '../../URLs/petfinderurls';
import inputStyles from '../../styles/AnimalInput.module.css';

const AnimalInputField = () => {
	const token = useContext(PetFinderAuthContext);

	const [petTypesAvailable, setPetTypesAvailable] = useState([]);
	const [currentAnimalType, setCurrentAnimalType] = useState('');
	const [currentAnimalBreed, setCurrentAnimalBreed] = useState('');

	const [availableAnimalBreeds, setAvailableAnimalBreeds] = useState([]);

	const [isSelected, setIsSelected] = useState(false);
	const [linkPathName, setLinkPathName] = useState('/animals');
	const [location, setLocation] = useState('');

	// unsure about useref, potentially store arrays for pet types, breeds
	// const breedArray = useRef([]);

	useEffect(() => {
		if (token === null) return;
		const fetchPetTypeOptions = async () => {
			const animalTypes = await fetch(`${petfinderUrls.types}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			const animalTypeArray = [];
			const animalTypesJson = await animalTypes.json();
			// React-select options for Animal type
			animalTypesJson.types.map((type, index) => {
				animalTypeArray.push({
					label: type.name,
					value: type.name.toLowerCase(),
					key: index,
				});
			});
			setPetTypesAvailable(animalTypeArray);
		};

		fetchPetTypeOptions();
	}, [token]);

	const handleSubmit = (event) => {
		// Do not reload page/submit
		event.preventDefault();
		console.log('breed', currentAnimalBreed);
		console.log('type', currentAnimalType);
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
			animalBreedsJson.breeds.map((breed, index) => {
				// React-select options for breed types
				breedsArray.push({
					label: `${breed.name}`,
					value: `${breed.name.toLowerCase()}`,
					key: index,
				});
			});

			setAvailableAnimalBreeds(breedsArray);
		};
		fetchAnimals();
	};

	const getPetBreedURL = (event) => {
		return `${petfinderUrls.types}${event.value.toLowerCase()}/breeds`;
	};

	const handleTypeSelectChange = (event) => {
		if (isSelected && currentAnimalType !== '') {
			setLinkPathName(`/animals/${currentAnimalType}`);
		}
		setCurrentAnimalType(event.value);
		setLinkPathName(`/animals/${[event.value]}`);

		const breedURL = getPetBreedURL(event);
		getPetOption(breedURL);

		setIsSelected(true);
	};

	const handleBreedSelectChange = (event) => {
		const breed = event.value;

		setCurrentAnimalBreed(breed);

		setLinkPathName(`/animals/${[currentAnimalType]}/breeds/${[breed]}`);
	};

	const handleLocationChange = (event) => {
		const location = event.target.value;
		setLocation(location);
		console.log(location);
	};

	return (
		<div>
			<form className="animalform" onSubmit={handleSubmit}>
				<p>What kind of animal are you looking for?</p>
				<Select
					className={inputStyles.inputAnimalType}
					autoFocus
					Value={`${currentAnimalType}`}
					options={petTypesAvailable}
					placeholder="Select animal type..."
					onChange={handleTypeSelectChange}
				/>
				{/* Render breeds after type is selected */}
				{isSelected ? (
					<>
						<Select
							className={inputStyles.inputAnimalBreed}
							options={availableAnimalBreeds}
							placeholder={`Please select or search for ${currentAnimalType} breeds`}
							onChange={handleBreedSelectChange}
						/>
						<input
							className="search"
							// value={zipcode}
							placeholder="search location"
							type="text"
							name="search"
							id="search"
							onChange={handleLocationChange}
						/>
					</>
				) : (
					<></>
				)}

				<Link
					href={{
						// inital value here isn't right until both select fields return values. get the pathname dynamically and disable form submit until at least 1 field has value.
						pathname: '/animals/[slug]',
						// Unsure if I also want to pass values as query, I can access values through path through router as well. Try to see what the difference is?
						query: {
							location,
						},
					}}
				>
					{isSelected ? (
						<button type="submit">Search for animals</button>
					) : (
						<></>
					)}
				</Link>
			</form>
		</div>
	);
};

export default AnimalInputField;
