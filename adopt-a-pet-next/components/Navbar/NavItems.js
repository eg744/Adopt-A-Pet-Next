import React from 'react';
import Link from 'next/link';

import styled from 'styled-components';
// Styled component, worked better for me with conditional style than the modules.

const StyledUL = styled.ul`
	padding: 18px;

	display: flex;
	flex-direction: row nowrap;
	align-items: center;
	justify-content: space-evenly;
	list-style: none;
	background: #000;
	color: #fff;
	height: 100%;
	width: 100%;
	margin: 0 auto;

	li :hover {
		color: #0070f3;
		border-color: #0070f3;
	}

	// Responsive mobile menu
	@media (max-width: 768px) {
		flex-flow: column nowrap;
		background-color: #0d2538;
		position: fixed;
		transform: ${({ open }) =>
			open ? 'translateX(0)' : 'translateX(100%)'};
		top: 0;
		right: 0;
		height: 100vh;
		width: 300px;
		padding-top: 3.5rem;
		border-radius: 2px;
		transition: transform 0.3s ease-in-out;

		li {
			color: #fff;
		}
	}
`;

const NavItems = ({ open }) => {
	return (
		// Menu open bool
		<StyledUL open={open}>
			<li>
				<Link href="/">Home</Link>
			</li>
			<li>
				<Link href="/about">About</Link>
			</li>
			<li>
				<Link href="/animals">Animals</Link>
			</li>
			<li>
				<Link href="/organizations">Shelters</Link>
			</li>
		</StyledUL>
	);
};

export default NavItems;
