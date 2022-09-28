import React from 'react';
import pageStyles from '../../styles/IndividualAnimalPage.module.css';

const DisplayAnimalContactInformation = ({ result }) => {
	if (result.contact.email || result.contact.phone) {
		return (
			// <div className={pageStyles.animalContainer}>
			<div>
				<h2>Contact Information:</h2>
				<div>
					Email: <div>{result.contact.email}</div>
				</div>
				<div>
					Phone: <div>{result.contact.phone}</div>
				</div>
			</div>
		);
	} else {
		return <></>;
	}
};

export default DisplayAnimalContactInformation;
