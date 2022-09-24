import React from 'react';
import AboutPage from '../styles/AboutPage.module.css';

const aboutPage = () => {
	return (
		<div className={AboutPage.aboutSection}>
			<p>
				<a href="https://github.com/eg744/Adopt-A-Pet-Next">
					Adopt-A-Pet by Elijah Gillit
				</a>
			</p>
			<p>
				<a href="https://nextjs.org/">Created with Next.JS</a>
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
