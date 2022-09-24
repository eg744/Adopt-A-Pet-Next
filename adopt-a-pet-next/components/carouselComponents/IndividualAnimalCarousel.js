import React, { useState, useEffect } from 'react';
import CarouselStyles from '../../styles/Carousel.module.css';
// import CarouselStyles from '../../styles/IndividualAnimalPage.module.css';
import IndividualAnimalImages from '../imgComponents/IndividualAnimalImages';

const IndividualAnimalCarousel = ({ result }) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isloading, setIsloading] = useState(true);
	const [carouselAnimals, setCarouselAnimals] = useState([]);

	useEffect(() => {
		const getCarousel = () => {
			// think about pushing array of photos instead of entire animal object. Would require restructuring
			const selectedAnimal = [];

			if (result.photos[0] && result.photos[0].full) {
				for (const image of result.photos) {
					selectedAnimal.push(image);
				}
			}

			if (selectedAnimal.length >= 1) {
				setIsloading(false);
			}
			return selectedAnimal;
		};
		const animals = getCarousel();
		setCarouselAnimals(animals);
		// console.log('carousel', carouselAnimals);
	}, [result]);

	const gotoPrevious = () => {
		const isFirst = currentIndex === 0;
		const newIndex = isFirst
			? carouselAnimals.length - 1
			: currentIndex - 1;
		setCurrentIndex(newIndex);
	};

	const gotoNext = () => {
		const isLast = currentIndex === carouselAnimals.length - 1;
		const newIndex = isLast ? 0 : currentIndex + 1;
		setCurrentIndex(newIndex);
	};

	if (!isloading && carouselAnimals.length > 1) {
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
	} else {
		return <div>loading</div>;
	}
};
export default IndividualAnimalCarousel;
