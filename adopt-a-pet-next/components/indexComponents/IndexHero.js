import React, { useState, useEffect } from 'react';
import homeStyles from '../../styles/Home.module.css';
import BGImage from '../imgComponents/BGImage.js';
import AnimalInputField from '../userInputs/AnimalInputField';
import ShelterInputField from '../userInputs/ShelterInputField';
import Header from '../Header.js';
import adoptaPetHeroBanner from '/public/assets/adoptapetHeroBanner.png';

const IndexHero = ({ animals }) => {
	const [scrollOffsetY, setScrollOffSetY] = useState(0);

	// Function in declaration here to be able to remove on unmount
	const handleScroll = () => {
		setScrollOffSetY(window.pageYOffset);
	};

	useEffect(() => {
		window.addEventListener('scroll', setScrollOffSetY);

		// Clean up listener
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);
	return (
		<div className={homeStyles.header}>
			<Header />

			<section className={homeStyles.home_hero}>
				<BGImage
					image={adoptaPetHeroBanner}
					alt={'Dog and Cat lying next to each other.'}
				/>
				<AnimalInputField className={homeStyles.home_input_field} />
			</section>
			<section>
				<ShelterInputField />
			</section>
		</div>
	);
};

export default IndexHero;
