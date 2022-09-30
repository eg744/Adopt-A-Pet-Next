// root for animal page
import Link from 'next/link';
import ResultPage from '../../components/Result-page';
import React, { useContext, useEffect, useState } from 'react';
import Head from 'next/head';
import AnimalInputField from '../../components/userInputs/AnimalInputField';
import BGImage from '../../components/imgComponents/BGImage';
import animalsPageBanner from '../../public/assets/animalsPageBannerFull.jpg';
import indexStyles from '../../styles/Home.module.css';

const AnimalIndex = () => {
	return (
		<div className={indexStyles.home_hero}>
			<Head>
				<title>Animals Page</title>
				<meta
					name="keywords"
					content="pet adoption, adopt-a-pet, petfinder"
				/>
			</Head>
			<BGImage
				image={animalsPageBanner}
				alt={'Kitten and puppy rolling around in grass'}
			/>

			<AnimalInputField />
		</div>
	);
};
export default AnimalIndex;
