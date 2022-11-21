import React from 'react';
import pageStyles from '../../../styles/IndividualAnimalPage.module.css';

const DisplayAnimalContactInformation = ({ result }) => {
	const Phone = ({ result }) => {
		if (result.phone) {
			return (
				<div className={pageStyles.externalLink}>
					Phone: {result.phone}
				</div>
			);
		}
	};
	const Website = ({ result }) => {
		if (result.website) {
			return (
				<div className={pageStyles.externalLink}>
					<a href={result.website}>Website: {result.website}</a>
				</div>
			);
		}
	};
	const Email = ({ result }) => {
		if (result.email) {
			return (
				<div className={pageStyles.externalLink}>
					Email: {result.email}
				</div>
			);
		}
	};

	return (
		<div>
			<Phone result={result} />
			<Website result={result} />
			<Email result={result} />
		</div>
	);
};

export default DisplayAnimalContactInformation;
