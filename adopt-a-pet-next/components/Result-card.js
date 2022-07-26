import React, { useState } from 'react';

import cardStyles from '../styles/ResultGrid.module.css';

import htmlDecode from './cardComponents/htmlDecoder.js';

import AnimalImage from './cardComponents/AnimalImage.js';

const Card = (props) => {
	// Retrieved data
	const { result } = props;

	return (
		<div className={cardStyles.card}>
			<a href={result.url}>{/* <div>{result.id}</div> */}</a>
			<AnimalImage result={result} />
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
