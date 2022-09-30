import React from 'react';
import ShelterInputField from '../../components/userInputs/ShelterInputField';
import Head from 'next/head';

import BGImage from '../../components/imgComponents/BGImage';
import sheltersPageBanner from '../../public/assets/sheltersPageBannerFull.jpg';
import indexStyles from '../../styles/Home.module.css';

const OrganizationIndex = () => {
	return (
		<div className={indexStyles.home_hero}>
			<Head>
				<title>Organizations Page</title>
				<meta
					name="keywords"
					content="pet adoption, adopt-a-pet, petfinder"
				/>
			</Head>
			<BGImage
				image={sheltersPageBanner}
				alt={'A lot of puppies in a line'}
			/>
			<ShelterInputField />
		</div>
	);
};
export default OrganizationIndex;
