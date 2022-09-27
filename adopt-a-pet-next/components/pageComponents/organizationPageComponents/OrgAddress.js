import React from 'react';
import orgStyles from '../../../styles/OrganizationPage.module.css';

const OrgAddress = ({ result }) => {
	const address = result.address;

	let currentAddress = [];
	for (let a in address) {
		// Non null values, including 1 address
		if (address[a] !== null && a !== 'address2') {
			currentAddress.push({
				key: a,
				value: address[a] + ' ',
			});
		}
	}

	return <div>{currentAddress.map((address) => address.value)}</div>;
};

export default OrgAddress;
