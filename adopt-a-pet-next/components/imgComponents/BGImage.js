import { useEffect, useState } from 'react';
import adoptapetHeroBanner from '../../public/assets/adoptapetHeroBanner.png';
// import adoptapetHeroBanner from '../../public/assets/adoptapetHeroBannerFull.jpg';
import Image from 'next/image';
import homeStyles from '../../styles/Home.module.css';

// Current dimensions
function getWindowDimensions() {
	const { innerWidth: width, innerHeight: height } = window;

	return { width, height };
}

const BGImage = () => {
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
		console.log(width);

		return (
			<Image
				className={homeStyles.banner_image}
				src={adoptapetHeroBanner}
				layout="responsive"
				objectFit="cover"
				objectPosition="center"
				sizes="50vw"
				// width={width}
				// height={height}
				quality={100}
				// Replace with blurred image while loading
				// placeholder="blur"
				alt="Dog and Cat lying next to each other."
			/>
		);
	}
	// Else not valid dimensions
	return null;
};

export default BGImage;