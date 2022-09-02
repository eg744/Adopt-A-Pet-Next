import React, { useState } from 'react';

import styled, { css } from 'styled-components';

import NavItems from './NavItems.js';

// old
// const HamburgerBarStyled = styled.div`
// 	width: 2rem;
// 	height: 2rem;
// 	position: fixed;
// 	top: 15px;
// 	right: 20px;

// 	display: flex;
// 	justify-content: space-around;
// 	flex-flow: column nowrap;

// 	list-style: none;
// 	cursor: pointer;

// 	transform-origin: 1px;

// 	div {
// 		width: 2rem;
// 		height: 0.25rem;
// 		background-color: #333;
// 		border-radius: 10px;
// 		${({ open }) => css`
// 			&:nth-child(1) {
// 				transform: ${open ? 'rotate(45deg)' : 'rotate(0deg)'};
// 			}

// 			&:nth-child(2) {
// 				transform: ${open ? 'translateX(100%)' : 'translateX(0)'};
// 				opacity: ${open ? 0 : 1};
// 			}

// 			&:nth-child(3) {
// 				transform: ${open ? 'rotate(-45deg)' : 'rotate(0deg)'};
// 			}
// 		`};
// 	}
// `;

// // Mobile hamburger menu
// const HamburgerMenu = () => {
// 	const [openMenu, setOpenMenu] = useState(false);

// 	return (
// 		<HamburgerBarStyled
// 			open={openMenu}
// 			onClick={() => setOpenMenu(!openMenu)}
// 		>
// 			{/* Todo: set this conditonal style for children based on state. Unsure how to
// 			implement with the css module. Using styled-components for this https://styled-components.com/ issues with styles disappearing on reload. solution: https://stackoverflow.com/questions/64740663/next-js-and-styled-components-go-out-of-sync-between-the-server-and-the-client-o 'npm install babel-plugin-styled-components --save-dev' */}
// 			<div className={navStyles.hamburger_bar1}></div>
// 			<div className={navStyles.hamburger_bar2}></div>
// 			<div className={navStyles.hamburger_bar3}></div>
// 		</HamburgerBarStyled>
// 	);
// };

// styled-components
const StyledBurgerMenu = styled.div`
	width: 2rem;
	height: 2rem;
	position: fixed;
	top: 15px;
	right: 20px;
	z-index: 99;
	display: none;
	cursor: pointer;
	@media (max-width: 768px) {
		display: flex;
		justify-content: space-around;
		flex-flow: column nowrap;
	}
	div {
		width: 2rem;
		height: 0.35rem;
		background-color: ${({ open }) => (open ? '#C16C68' : '#777')};
		border-radius: 10px;
		border: 1px solid black;
		transform-origin: 1px;
		transition: all 0.3s linear;
		&:nth-child(1) {
			transform: ${({ open }) => (open ? 'rotate(45deg)' : 'rotate(0)')};
		}
		&:nth-child(2) {
			transform: ${({ open }) =>
				open ? 'translateX(100%)' : 'translateX(0)'};
			opacity: ${({ open }) => (open ? 0 : 1)};
		}
		&:nth-child(3) {
			transform: ${({ open }) => (open ? 'rotate(-45deg)' : 'rotate(0)')};
		}
	}
`;

const HamburgerMenu = () => {
	const [open, setOpen] = useState(false);

	return (
		<>
			<StyledBurgerMenu open={open} onClick={() => setOpen(!open)}>
				<div />
				<div />
				<div />
			</StyledBurgerMenu>
			<NavItems open={open} />
		</>
	);
};

export default HamburgerMenu;
