// Next link component
import Link from 'next/link';
import Image from 'next/image';

import navStyles from '../../styles/Nav.module.css';
import React, { useState } from 'react';
import NavItems from './NavItems';
import HamburgerMenu from './HamburgerMenu';

const Nav = () => {
	const [mobileMenuToggle, setMobileMenuToggle] = useState(false);
	return (
		<nav className={navStyles.nav}>
			<Link href="/">
				<a>
					<Image
						className={navStyles.logo}
						src="/assets/adoptapetLogo.png"
						alt="Adopt A Pet Logo"
						layout="fixed"
						height="94px"
						width="140px"
					/>
				</a>
			</Link>
			{/* <img
				className={navStyles.logo}
				src="\assets\adoptapetLogo.png"
				alt="Adopt A Pet Logo"
			></img> */}

			<HamburgerMenu />

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
