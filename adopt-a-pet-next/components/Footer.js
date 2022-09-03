import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import footerStyles from '../styles/Footer.module.css';

const Footer = () => {
	return (
		<div className={footerStyles.footer}>
			<Image
				className={footerStyles.logo}
				src="/assets/adoptapetLogo.png"
				alt="Adopt A Pet Logo"
				layout="fixed"
				height="100%"
				width="140%"
			/>
			<div>
				<p>Created using Next.JS and Petfinder's API</p>
				<a href="https://github.com/eg744/Adopt-A-Pet-Next">
					View code on Github:
					<Image
						className="footer.githublogo"
						src="/assets/githubLogoSmallLight.png"
						alt="Github logo"
						layout="fixed"
						height="30%"
						width="30%"
					/>
				</a>
			</div>
			<p>Created logo at LogoMakr.com/app</p>
		</div>
	);
};

export default Footer;
