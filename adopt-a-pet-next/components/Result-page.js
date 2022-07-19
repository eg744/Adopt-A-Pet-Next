import React from 'react';

import resultGridStyles from '../styles/ResultGrid.module.css';

const Results = (props) => {
	return (
		<div className={resultGridStyles.resultsGrid}>
			{props.results.map((result) => (
				<ResultCard key={result.id} result={result} />
			))}
		</div>
	);
};

export default Results;
