import React, { useState, useEffect } from 'react';

import cardStyles from '../styles/Card.module.css';

import htmlDecode from './cardComponents/HtmlDecoder.js';

import AnimalImage from './cardComponents/AnimalImage.js';

import Link from 'next/link';
import { petfinderUrls } from '../URLs/petfinderurls';

const FeaturedPets = ({ result }) => {
	return (
		<div className={cardStyles.card}>
			<a href={result.url}>View {result.name} on Petfinder</a>
			<AnimalImage className={cardStyles.image} result={result} />
			<p className={cardStyles.name}>{result.name}</p>
			{/* <div
				dangerouslySetInnerHTML={{
					__html: htmlDecode(result.description),
				}}
			></div> */}
		</div>
	);
};

export default FeaturedPets;