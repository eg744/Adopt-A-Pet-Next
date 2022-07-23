import React, { useState } from 'react';

import cardStyles from '../styles/ResultGrid.module.css';

import AnimalImage from './AnimalImage.js';

const Card = (props) => {
	// Retrieved data
	const { result } = props;

	// Helper function unescapes html string to catch and convert to human friendly html in returned div
	function htmlDecode(content) {
		let div = document.createElement('div');
		div.innerHTML = content;
		return div.childNodes.length === 0 ? '' : div.childNodes[0].nodeValue;
	}

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
