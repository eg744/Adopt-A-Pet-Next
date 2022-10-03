import React, { useState, useEffect, useRef } from 'react';

import styled, { css } from 'styled-components';

import NavItems from './NavItems.js';

// styled-components
const StyledBurgerMenu = styled.div`
	width: 2rem;
	height: 2rem;
	position: fixed;
	top: 15px;
	right: 20px;
	z-index: 1001;
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

const HamburgerMenu = ({ onClickOutside }) => {
	const [open, setOpen] = useState(false);

	// Close menu when clicking outside menu. Also closes inside menu, needs some work.

	const ref = useRef(null);
	useEffect(() => {
		const handleOutsideClick = (event) => {
			if (ref.current && !ref.current.contains(event.target)) {
				// onClickOutside && onClickOutside();
				setOpen(false);
			}
		};
		document.addEventListener('click', handleOutsideClick, true);

		// cleanup
		return () => {
			document.removeEventListener('click', handleOutsideClick, true);
		};
	}, [onClickOutside]);

	return (
		<>
			<StyledBurgerMenu
				open={open}
				onClick={() => setOpen(!open)}
				onClickOutside={onClickOutside}
				ref={ref}
			>
				<div />
				<div />
				<div />
			</StyledBurgerMenu>
			<NavItems open={open} />
		</>
	);
};

export default HamburgerMenu;
