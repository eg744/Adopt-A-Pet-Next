import React, { useState } from 'react';

import cardStyles from '../styles/Card.module.css';

// import htmlDecode from './cardComponents/htmldecoder';

import AnimalImage from './cardComponents/AnimalImage';

import Link from 'next/link';
import { useRouter } from 'next/router';

const Card = (props) => {
	// Retrieved data
	const router = useRouter();
	const { result } = props;

	function htmlDecode(content) {
		let div = document.createElement('div');
		div.innerHTML = content;
		return div.childNodes.length === 0 ? '' : div.childNodes[0].nodeValue;
	}

	const individualAnimalRedirect = () => {
		router.push({
			pathName: '/animals/[animalID]',
			query: { ...router.query, animalID: `${result.id}` },
		});
	};

	return (
		<div className={cardStyles.card}>
			{/* <a href={result.url}>View {result.name} on Petfinder</a> */}
			<div>
				<Link
					href={{
						pathname: `/animals/animal/[animalID]`,

						query: { animalID: `${result.id}` },
					}}
				>
					<a>
						<AnimalImage
							className={cardStyles.image}
							result={result}
						/>
						<p
							className={cardStyles.animalName}
							dangerouslySetInnerHTML={{
								__html: htmlDecode(`${result.name}`),
							}}
						/>
						<div
							className="animalDescription"
							dangerouslySetInnerHTML={{
								__html: htmlDecode(`${result.description}`),
							}}
						/>
					</a>
				</Link>
			</div>
		</div>
	);
};
export default Card;
