import React from 'react';
import AnimalTags from './AnimalTags';
import pageStyles from '../../styles/IndividualAnimalPage.module.css';

const DisplayTags = ({ result }) => {
	if (result.tags.length >= 1) {
		return (
			<div className={pageStyles.tagContainer}>
				<h3>{result.name} is:</h3>
				<ul>
					{result.tags.map((tag, index) => (
						<AnimalTags key={index} tag={tag} />
					))}
				</ul>
			</div>
		);
	} else {
		return <></>;
	}
};

export default DisplayTags;
