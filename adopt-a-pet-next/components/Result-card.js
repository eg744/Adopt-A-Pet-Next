import React, { useState } from 'react';

import cardStyles from '../styles/ResultGrid.module.css';

import AnimalImage from './AnimalImage.js';

const Card = (props) => {
	// Retrieved data
	const { result } = props;

	return (
		<div className={cardStyles.card}>
			<a href={result.url}>{/* <div>{result.id}</div> */}</a>
			<AnimalImage result={result} />
			<p>{result.name}</p>
			<p>{result.description}</p>
		</div>
	);
};
export default Card;
