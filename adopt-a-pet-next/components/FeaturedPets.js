import React, { useState, useEffect } from 'react';

import featuredStyles from '../styles/FeaturedPets.module.css';

// import { htmlDecode } from './cardComponents/HtmlDecoder';

import AnimalImage from './cardComponents/AnimalImage.js';

import Link from 'next/link';
import { useRouter } from 'next/router';
import { petfinderUrls } from '../URLs/petfinderurls';

const FeaturedPets = ({ result }) => {
	const router = useRouter();
	console.log('featured result', result);

	const individualAnimalRedirect = () => {
		router.push({
			pathName: '/animals/animal/[animalID]',
			query: { animalID: `${result.id}` },
		});
	};
	return (
		<div className={featuredStyles.card}>
			<a href={result.url}>View {result.name} on Petfinder</a>
			<div>
				<Link
					href={{
						pathname: `/animals/animal/[animalID]`,

						query: { animalID: `${result.id}` },
					}}
				>
					<a>
						<AnimalImage
							className={featuredStyles.image}
							result={result}
						/>
						<p className={featuredStyles.name}>
							View {result.name}
						</p>
					</a>
				</Link>

				{/* <p>{result.name}</p> */}

				{/* if i want description <div
				dangerouslySetInnerHTML={{
					__html: htmlDecode(result.description),
				}}
			></div> */}
			</div>
		</div>
	);
};

export default FeaturedPets;
