// Next link component
import Link from 'next/link';
import navStyles from '../../styles/Nav.module.css';
import React, { useState } from 'react';
import NavItems from './NavItems';
import HamburgerMenu from './HamburgerMenu';

const Nav = () => {
	const [mobileMenuToggle, setMobileMenuToggle] = useState(false);
	return (
		<nav className={navStyles.nav}>
			<img
				className={navStyles.logo}
				src="\assets\adoptapetLogo.png"
				alt="Adopt A Pet Logo"
			></img>
			<HamburgerMenu />
			<NavItems />

			{/* <ul className={navStyles.nav_items}>
				<a href="/">
					<img
						className={navStyles.logo}
						src="\assets\adoptapetLogo.png"
						alt="Adopt A Pet Logo"
					></img>
				</a>
			</ul> */}
		</nav>
	);
};

export default Nav;
