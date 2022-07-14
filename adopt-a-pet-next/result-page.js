import React from 'react';

import resultGridStyles from '../resultGrid.module.css';

const Results = (props) => {
	// if(props.loading){
	//     return <Spinner></Spinner>
	// }
	return (
		<div className={resultGridStyles.resultsGrid}>
			{props.results.map((result) => (
				<ResultCard key={result.id} result={result} />
			))}
		</div>
	);
};

export default Results;
