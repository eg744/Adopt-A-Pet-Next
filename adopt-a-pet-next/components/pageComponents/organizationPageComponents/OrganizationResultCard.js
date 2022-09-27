import React from 'react';
import orgStyles from '../../../styles/OrganizationPage.module.css';
import OrgAddress from './OrgAddress';

const OrganizationResultCard = ({ result }) => {
	console.log(result);
	return (
		<li className={orgStyles.listItem}>
			<p className={orgStyles.listItem}>{`${result.name}`}</p>
			<OrgAddress result={result} />
			{/* <div>Address: {`${result.address.address1}`}</div> */}
		</li>
	);
};

export default OrganizationResultCard;
