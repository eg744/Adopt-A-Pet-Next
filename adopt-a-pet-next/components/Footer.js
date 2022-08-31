import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import footerStyles from '../styles/Footer.module.css';
// import { githubLogo } from '../public/assets';

const Footer = () => {
	return (
		<div className={footerStyles.footer}>
			<img
				className={footerStyles.logo}
				src="\assets\adoptapetLogo.png"
				alt="Adopt A Pet Logo"
			></img>
			<p>Created logo at LogoMakr.com/app</p>
			<a href="https://github.com/eg744/Adopt-A-Pet-Next">
				View on Github:
				<Image
					className="footer.githublogo"
					src="/assets/githubLogo.png"
					alt="Github logo"
					layout="fixed"
					height="50%"
					width="50%"
				/>
			</a>
		</div>
	);
};

export default Footer;
