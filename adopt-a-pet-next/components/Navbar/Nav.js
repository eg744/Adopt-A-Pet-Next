// Next link component
import Link from 'next/link';
import Image from 'next/image';

import navStyles from '../../styles/Nav.module.css';
import React, { useState } from 'react';
import HamburgerMenu from './HamburgerMenu';

const Nav = () => {
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

			<HamburgerMenu />
		</nav>
	);
};

export default Nav;
