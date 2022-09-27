import React from 'react';
import OrganizationResultCard from './OrganizationResultCard';
// styles\OrganizationPage.module.css
import orgStyles from '../../../styles/OrganizationPage.module.css';

const OrganizationInformation = ({ results }) => {
	return (
		<div>
			<ul className={orgStyles.organizationList}>
				{results.map((result) => (
					<OrganizationResultCard key={result.id} result={result} />
				))}
			</ul>
		</div>
	);
};
export default OrganizationInformation;
