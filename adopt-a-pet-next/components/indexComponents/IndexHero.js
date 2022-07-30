import React, { useState, useEffect } from 'react';
import homeStyles from '../../styles/Home.module.css';
import BGImage from '../imgComponents/BGImage.js';
import Header from '../Header.js';

const IndexHero = () => {
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
		<div>
			<Header />

			<section className={homeStyles.home_hero}>
				<h1 className={homeStyles.landing_text}>
					Search for an animal
				</h1>
			</section>
			<BGImage />
		</div>
	);
};

export default IndexHero;
