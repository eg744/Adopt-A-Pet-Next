import { useEffect, useState } from 'react';
import Image from 'next/image';
import homeStyles from '../../styles/Home.module.css';

// Current dimensions
function getWindowDimensions() {
	const { innerWidth: width, innerHeight: height } = window;

	return { width, height };
}

const BGImage = ({ image, alt }) => {
	const [width, setWidth] = useState();
	const [height, setHeight] = useState();

	// Set background img size
	useEffect(() => {
		const { width, height } = getWindowDimensions();
		setWidth(width);
		setHeight(height);
	}, []);

	useEffect(() => {
		function resize() {
			const { width, height } = getWindowDimensions();
			setWidth(width);
			setHeight(height);
		}

		// On window resize, change background img state
		window.addEventListener('resize', resize);
		return () => window.removeEventListener('resize', resize);
	}, []);

	if (width && height) {
		return (
			<Image
				className={homeStyles.banner_image}
				src={image}
				priority="true"
				layout="fill"
				objectFit="cover"
				// position="relative"
				// width="6240"
				// height="4160"
				// width="100vw"
				// height="100vh"
				objectPosition="center"
				sizes="100vw"
				quality={100}
				// Replace with blurred image while loading
				// placeholder="blur"
				alt={alt}
			/>
		);
	}
	// Else not valid dimensions
	return null;
};

export default BGImage;
