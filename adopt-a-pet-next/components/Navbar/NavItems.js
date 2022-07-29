import React from 'react';
import Link from 'next/link';
import navStyles from '../../styles/Nav.module.css';

const NavItems = () => {
	return (
		<ul className={navStyles.nav_items}>
			<li>
				<Link href="/">Home</Link>
			</li>
			<li>
				<Link href="/about">About</Link>
			</li>
			<li>
				<Link href="/animalIndex">Animals</Link>
			</li>
			<li>
				<Link href="/about">Breeds</Link>
			</li>
		</ul>
	);
};

export default NavItems;
