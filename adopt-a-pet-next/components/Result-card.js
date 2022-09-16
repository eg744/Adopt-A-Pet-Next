import React, { useState } from 'react';

import cardStyles from '../styles/Card.module.css';

// import htmlDecode from './cardComponents/HtmlDecoder';

import AnimalImage from './cardComponents/AnimalImage';

import Link from 'next/link';

const Card = (props) => {
	// Retrieved data
	const { result } = props;
	// TODO: link for individual animal in /animal/[animalID] based on result.id

	function htmlDecode(content) {
		let div = document.createElement('div');
		div.innerHTML = content;
		return div.childNodes.length === 0 ? '' : div.childNodes[0].nodeValue;
	}

	return (
		<div className={cardStyles.card}>
			<a href={result.url}>View {result.name} on Petfinder</a>
			<div>
				<Link href="/animals/animal/[animalID]">
					<AnimalImage className={cardStyles.image} result={result} />
					<p>{result.name}</p>
				</Link>

				<div
					dangerouslySetInnerHTML={{
						__html: htmlDecode(result.description),
					}}
				></div>
			</div>
		</div>
	);
};
export default Card;
