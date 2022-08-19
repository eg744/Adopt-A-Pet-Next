import React from 'react';

import resultGridStyles from '../styles/ResultGrid.module.css';

import ResultCard from './Result-card.js';

const Results = ({ results }) => {
	return (
		<div className={resultGridStyles.resultsGrid}>
			{results.map((result) => (
				// ID per animal
				<ResultCard key={result.id} result={result} />
			))}
		</div>
	);
};

export default Results;
