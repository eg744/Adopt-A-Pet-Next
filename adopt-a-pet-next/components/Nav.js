// Nav bar
import React from 'react';
// Next link component
import Link from 'next/link';
import navStyles from '../styles/Nav.module.css';

const Nav = () => {
	return (
		<nav className={navStyles.nav}>
			<ul>
				<a href="/">
					<img
						className={navStyles.logo}
						src="\assets\adoptapetLogo.png"
					></img>
				</a>

				<li>
					<Link href="/">Home</Link>
				</li>
				<li>
					<Link href="/about">About</Link>
				</li>
				<li>
					<Link href="/animalHome">Animals</Link>
				</li>
				<li>
					<Link href="/about">Breeds</Link>
				</li>
			</ul>
		</nav>
	);
};

export default Nav;
