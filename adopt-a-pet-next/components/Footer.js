import React from 'react';
import Link from 'next/link';
import footerStyles from '../styles/Footer.module.css';

const Footer = () => {
	return (
		<div className={footerStyles.footer}>
			<p>Created logo at LogoMakr.com/app</p>
		</div>
	);
};

export default Footer;
