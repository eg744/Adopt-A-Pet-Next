// root for animal page
import link from 'next/link';
import ResultPage from '../../components/Result-page';
import React, { useContext, useEffect, useState } from 'react';
import { defaultHead } from 'next/head';
import { PetFinderAuthContext } from '../_app';
import InputField from '../../components/InputField';
import { petfinderUrls } from '../../URLs/petfinderurls';

function AnimalIndex() {
	// might want to think about this https://stackoverflow.com/questions/64399034/how-can-i-reuse-the-api-data-for-all-the-pages-in-react-js

	// look at this to reuse api call https://stackoverflow.com/questions/70116072/react-js-creating-a-reusable-component-to-get-api-data
	const petParams = new URLSearchParams();
	petParams.append('type', 'dog');
	petParams.append('breed', 'pug');
	console.log('animalindex', `${petfinderUrls.animals}/${petParams}`);

	// console.log('petparams', petParams);
	const [results, setResults] = useState(null);
	const [isloading, setIsloading] = useState(false);
	const [animalTypes, setAnimalTypes] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);

	const token = useContext(PetFinderAuthContext);

	useEffect(() => {
		// 		export default async (req, res) => {
		// 	const params = new URLSearchParams();
		// 	params.append('grant_type', 'client_credentials');
		// 	params.append('client_id', petFinderAPIKey);
		// 	params.append('client_secret', petFinderSecretKey);
		// 	const petfinderResponse = await fetch(
		// 		'https://api.petfinder.com/v2/oauth2/token',
		// 		{
		// 			method: 'POST',
		// 			body: params,
		// 		}
		// 	);
		// 	const petFinderData = await petfinderResponse.json();
		// 	res.send(petFinderData);
		// };
		if (token === null) return;
		try {
			const fetchAnimals = async (req, res) => {
				const animalData = await fetch(
					// request structure: "Authorization: Bearer {YOUR_ACCESS_TOKEN}" GET https://api.petfinder.com/v2/{CATEGORY}/{ACTION}?{parameter_1}={value_1}&{parameter_2}={value_2}
					// https://www.petfinder.com/developers/v2/docs/#request-structure

					`${petfinderUrls.animals}${petParams}`,

					// `https://api.petfinder.com/v2/animals?${petParams}`,
					// 'https://api.petfinder.com/v2/animals?type=dog&breed=pug'
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				const animalDataJson = await animalData.json();
				console.log(animalDataJson);
				setResults(animalDataJson.animals);
			};

			fetchAnimals();
		} catch (event) {
			//
		} finally {
			setIsloading(false);
		}

		// Update when token changes
	}, [token]);

	if (results === null) return null;

	console.log('animalindex results', results);
	return (
		<div>
			<InputField />
			<ResultPage results={results}></ResultPage>;
		</div>
	);
}
export default AnimalIndex;

// example getstaticprops
// function Users({ users }) {
// 	// console.log(animals);

// 	return (
// 		<div>
// 			<h1>user list</h1>

// 			{users.map((animal) => {
// 				return (
// 					<div key={animal.id}>
// 						<p>{animal.id}</p>
// 					</div>
// 				);
// 			})}
// 		</div>
// 	);
// }

// export const getStaticProps = async () => {
// 	const response = await fetch('https://jsonplaceholder.typicode.com/users');

// 	const posts = await response.json();
// 	console.log('posts', posts);
// 	return {
// 		props: {
// 			users: posts,
// 		},
// 	};
// };
// export default Users;
