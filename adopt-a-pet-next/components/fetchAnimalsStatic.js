// Testing fetching from api with getstaticprops

import { PetFinderAuthContext } from '../pages/_app';
import React, { useState, useContext, useEffect } from 'react';
import RenderResult from 'next/dist/server/render-result';

// useEffect(() => {
// 	if (token === null) return;
// });

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

export const getStaticProps = async () => {
	const token = await useContext(PetFinderAuthContext);

	console.log('token', token);

	// const [results, setResults] = useState(null);

	// if (token === null) return;
	const response = await fetch(
		'https://api.petfinder.com/v2/animals?type=dog',
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	);
	const animalDataJson = await response.json();
	console.log('fetchanimal animalindex', animalDataJson);
	// setResults(animalDataJson.animals);

	// if (results === null) return null;

	return {
		props: {
			animals: animalDataJson,
		},
	};
};
export default FetchAnimalsStatic;
