import React, { useState, useEffect } from 'react';
import CarouselStyles from '../../styles/Carousel.module.css';
import FeaturedPets from '../FeaturedPets';

const Carousel = ({ results }) => {
	const [currentIndex, setCurrentIndex] = useState(0);

	let myAnimals = [];
	results.map((result) => {
		if (result.photos[0] && result.photos[0].full && result.name) {
			myAnimals.push(result);
		}
	});

	// console.log('caro', myAnimals);
	// console.log('caroindex', currentIndex);
	// console.log('anuimalsindex', currentIndex - 1);

	const gotoPrevious = () => {
		const isFirst = currentIndex === 0;
		const newIndex = isFirst ? myAnimals.length - 1 : currentIndex - 1;
		setCurrentIndex(newIndex);
	};

	const gotoNext = () => {
		const isLast = currentIndex === myAnimals.length - 1;
		const newIndex = isLast ? 0 : currentIndex + 1;
		setCurrentIndex(newIndex);
	};

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
					<FeaturedPets result={myAnimals[currentIndex]} />
					<FeaturedPets result={myAnimals[currentIndex + 1]} />
				</div>
			</div>
		</div>
	);
};
export default Carousel;
