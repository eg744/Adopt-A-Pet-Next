import React from 'react';
import Link from 'next/link';
import orgStyles from '../../../styles/OrganizationPage.module.css';
import OrgAddress from './OrgAddress';

const OrganizationResultCard = ({ result }) => {
	// console.log(result);
	return (
		<li className={orgStyles.listItem}>
			<p className={orgStyles.orgName}>{`${result.name}`}</p>
			<OrgAddress result={result} />
			<div>{result.phone}</div>
			{/* <a href={result.website}>{result.website}</a> */}

			<Link
				href={{
					pathname: `/organizations/organization/[organizationID]`,
					query: { organizationID: `${result.id}` },
				}}
			>
				<div className={orgStyles.shelterLink}>
					<button className={orgStyles.shelterLink}>
						View more information about this shelter
					</button>
				</div>
			</Link>
		</li>
	);
};

export default OrganizationResultCard;
