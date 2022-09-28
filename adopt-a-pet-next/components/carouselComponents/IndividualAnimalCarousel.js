import React, { useState, useEffect } from 'react';
import CarouselStyles from '../../styles/Carousel.module.css';
// import CarouselStyles from '../../styles/IndividualAnimalPage.module.css';
import IndividualAnimalImages from '../imgComponents/IndividualAnimalImages';

const IndividualAnimalCarousel = ({ result }) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isloading, setIsloading] = useState(true);
	const [validCarousel, setValidCarousel] = useState([]);

	useEffect(() => {
		const getCarousel = () => {
			// think about pushing array of photos instead of entire animal object. Would require restructuring. Functional but not ideal solution
			const selectedImage = [];

			if (result.photos[0] && result.photos[0].full) {
				for (const image of result.photos) {
					selectedImage.push(image);
				}
			}

			if (selectedImage.length >= 1) {
				setIsloading(false);
			}
			return selectedImage;
		};
		const validImage = getCarousel();
		setValidCarousel(validImage);
		// console.log('carousel', carouselAnimals);
	}, [result]);

	// Check and set valid index, loop around
	const gotoPrevious = () => {
		const isFirst = currentIndex === 0;
		const newIndex = isFirst ? validCarousel.length - 1 : currentIndex - 1;
		setCurrentIndex(newIndex);
	};

	const gotoNext = () => {
		const isLast = currentIndex === validCarousel.length - 1;
		const newIndex = isLast ? 0 : currentIndex + 1;
		setCurrentIndex(newIndex);
	};
	// Multiple images
	if (!isloading && validCarousel.length > 1) {
		return (
			<div>
				<div className={CarouselStyles.container}>
					<div className={CarouselStyles.slider}>
						<div
							className={CarouselStyles.rightArrow}
							onClick={gotoNext}
						>
							⇨
						</div>
						<div
							className={CarouselStyles.leftArrow}
							onClick={gotoPrevious}
						>
							⇦
						</div>

						<IndividualAnimalImages
							result={result.photos[currentIndex].full}
						/>
					</div>
				</div>
			</div>
		);
	} else if (!isloading) {
		// Single image
		return (
			<div>
				<div className={CarouselStyles.container}>
					<div className={CarouselStyles.slider}>
						<IndividualAnimalImages
							result={result.photos[currentIndex].full}
						/>
					</div>
				</div>
			</div>
		);
	} else if (isloading && validCarousel.length > 1) {
		return <div>loading</div>;
	} else {
		// No image
		return <></>;
	}
};
export default IndividualAnimalCarousel;
