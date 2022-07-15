import React, { useState } from 'react';

import cardStyles from '../ResultGrid.module.css';

const Card = (props) => {
	// Retrieved data
	const { result } = props;

	return (
		<div className={cardStyles.card}>
			<a href={result.url}>
				<div></div>
			</a>
		</div>
	);
};
export default Card;
