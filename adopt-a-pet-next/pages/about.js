import React from 'react';
import Head from 'next/head';
import AboutPage from '../styles/AboutPage.module.css';

const aboutPage = () => {
	return (
		<div className={AboutPage.aboutSection}>
			<Head>
				<title>About Page</title>
				<meta
					name="keywords"
					content="pet adoption, adopt-a-pet, petfinder"
				/>
			</Head>
			<p>
				<a href="https://github.com/eg744/Adopt-A-Pet-Next">
					Adopt-A-Pet by Elijah Gillit
				</a>
			</p>
			<p>
				<a href="https://nextjs.org/">Created with Next.js</a>
			</p>
			<p>
				<a href="https://www.petfinder.com/developers/">
					Content from Petfinder&apos;s API
				</a>
			</p>
		</div>
	);
};
export default aboutPage;
