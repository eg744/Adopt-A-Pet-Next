import React, { useState } from 'react';

import cardStyles from '../styles/Card.module.css';

import htmlDecode from './cardComponents/HtmlDecoder.js';

import AnimalImage from './cardComponents/AnimalImage.js';

import Link from 'next/link';

const Card = (props) => {
	// Retrieved data
	const { result } = props;

	return (
		<div className={cardStyles.card}>
			<a href={result.url}></a>
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
