import React from 'react';
import Link from 'next/link';
import footerStyles from '../styles/Footer.module.css';

const Footer = () => {
	return (
		<div className={footerStyles.footer}>
			<img
				className={footerStyles.logo}
				src="\assets\adoptapetLogo.png"
				alt="Adopt A Pet Logo"
			></img>
			<p>Created logo at LogoMakr.com/app</p>
		</div>
	);
};

export default Footer;
