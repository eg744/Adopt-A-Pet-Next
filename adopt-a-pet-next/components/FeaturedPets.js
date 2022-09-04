import React, { useState, useEffect } from 'react';

import featuredStyles from '../styles/FeaturedPets.module.css';

// import { htmlDecode } from './cardComponents/HtmlDecoder';

import AnimalImage from './cardComponents/AnimalImage.js';

import Link from 'next/link';
import { petfinderUrls } from '../URLs/petfinderurls';

const FeaturedPets = ({ result }) => {
	return (
		<div className={featuredStyles.card}>
			<a href={result.url}>View {result.name} on Petfinder</a>
			<div>
				<AnimalImage className={featuredStyles.image} result={result} />
				<p className={featuredStyles.name}>{result.name}</p>
				{/* <div
				dangerouslySetInnerHTML={{
					__html: htmlDecode(result.description),
				}}
			></div> */}
			</div>
		</div>
	);
};

export default FeaturedPets;
