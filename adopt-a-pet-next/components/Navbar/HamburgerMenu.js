import navStyles from '../../styles/Nav.module.css';

import React, { useState } from 'react';

// Mobile hamburger menu
const HamburgerMenu = () => {
	const [openMenu, setOpenMenu] = useState(false);
	return (
		<div
			className={navStyles.hamburger}
			open={openMenu}
			onClick={() => setOpenMenu(!openMenu)}
		>
			{/* Todo: set this conditonal style for children based on state. Unsure how to
			implement with the css module. */}
			<div
				className={navStyles.hamburger_bar1}
				style={
					openMenu
						? { backgroundColor: '#ccc' }
						: { backgroundColor: '#333' }
				}
			></div>
			<div
				className={navStyles.hamburger_bar2}
				style={
					openMenu
						? { backgroundColor: '#ccc' }
						: { backgroundColor: '#333' }
				}
			></div>
			<div
				className={navStyles.hamburger_bar3}
				style={
					openMenu
						? { backgroundColor: '#ccc' }
						: { backgroundColor: '#333' }
				}
			></div>
		</div>
	);
};
export default HamburgerMenu;
