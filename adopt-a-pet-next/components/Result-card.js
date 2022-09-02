import React, { useState } from 'react';

import cardStyles from '../styles/Card.module.css';

import htmlDecode from './cardComponents/HtmlDecoder.js';

import AnimalImage from './cardComponents/AnimalImage.js';

import Link from 'next/link';

const Card = (props) => {
	// Retrieved data
	const { result } = props;
	// TODO: link for individual animal in /animal/[animalID] based on result.id

	return (
		<div className={cardStyles.card}>
			<a href={result.url}>View {result.name} on Petfinder</a>
			<AnimalImage className={cardStyles.image} result={result} />
			<p>{result.name}</p>
			<div
				dangerouslySetInnerHTML={{
					__html: htmlDecode(result.description),
				}}
			></div>
		</div>
	);
};
export default Card;
