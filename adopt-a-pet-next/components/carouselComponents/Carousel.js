import React, { useState, useEffect } from 'react';
import CarouselStyles from '../../styles/Carousel.module.css';
import FeaturedPets from '../FeaturedPets';

const Carousel = ({ results }) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isloading, setIsloading] = useState(true);
	const [carouselAnimals, setCarouselAnimals] = useState([]);

	// let carouselAnimals = [];
	// working
	// useEffect(() => {
	// 	try {
	// 		results.map((result) => {
	// 			if (
	// 				result.photos[0] &&
	// 				result.photos[0].full &&
	// 				result.name &&
	// 				result.url
	// 			) {
	// 				carouselAnimals.push(result);
	// 			}
	// 		});
	// 		// if (carouselAnimals.length >= 1) {
	// 		// 	setIsloading(false);
	// 		// }
	// 		console.log('caro', carouselAnimals);
	// 	} catch (error) {
	// 		console.error(error);
	// 	} finally {
	// 		setIsloading(false);
	// 	}

	// }, []);
	const getCarousel = () => {
		const animals = [];
		results.map((result) => {
			if (
				result.photos[0] &&
				result.photos[0].full &&
				result.name &&
				result.url
			) {
				animals.push(result);
			}
		});
		if (animals.length >= 1) {
			setIsloading(false);
		}
		return animals;
	};

	useEffect(() => {
		const carouselAnimals = getCarousel();
		setCarouselAnimals(carouselAnimals);
		console.log('caro', carouselAnimals);
	}, []);

	// console.log('caroindex', currentIndex);
	// console.log('anuimalsindex', currentIndex - 1);

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

	if (!isloading) {
		return (
			// <div>
			// 	<div className={CarouselStyles.container}>
			// 		<div className={CarouselStyles.slider}>
			// 			<div className={CarouselStyles.slide}>
			// 				{results.map((result) => {
			// 					<FeaturedPets key={result.id} result={result} />;
			// 				})}
			// 			</div>
			// 		</div>
			// 	</div>
			// </div>

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
						{/* Passing/rendering single animal in validated array */}
						<FeaturedPets result={carouselAnimals[currentIndex]} />
					</div>
				</div>
			</div>
		);
	} else {
		return <div>loading</div>;
	}
};
export default Carousel;
