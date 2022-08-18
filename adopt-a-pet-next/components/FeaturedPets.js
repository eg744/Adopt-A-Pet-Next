import React, { useState, useEffect } from 'react';
import ResultCard from '../components/Result-card';
import ResultPage from '../components/Result-page';

import cardStyles from '../styles/Card.module.css';

import htmlDecode from './cardComponents/HtmlDecoder.js';

import AnimalImage from './cardComponents/AnimalImage.js';

import Link from 'next/link';

// const FeaturedPets = (results) => {
// 	console.log(results);
// 	const [isLoading, setIsLoading] = useState(true);
// 	useEffect(() => {
// 		try {
// 			results.map((result) => {
// 				console.log(result.id);
// 				if (!isLoading && result !== null) {
// 					return <ResultCard />;
// 				}

// 				// return(<ResultCard />)
// 			});
// 		} catch (error) {
// 			console.log(error);
// 		} finally {
// 			setIsLoading(false);
// 		}
// 	}, []);

const FeaturedPets = (props) => {
	// Retrieved data
	const { result } = props;
	console.log('card', result);
	if (result.photos[0] && result.photos[0].full && result.name) {
		return (
			<div className={cardStyles.card}>
				<a href={result.url}></a>
				<AnimalImage result={result} />
				<p className={cardStyles.name}>{result.name}</p>
				{/* <div
				dangerouslySetInnerHTML={{
					__html: htmlDecode(result.description),
				}}
			></div> */}
			</div>
		);
	}
};

export default FeaturedPets;
