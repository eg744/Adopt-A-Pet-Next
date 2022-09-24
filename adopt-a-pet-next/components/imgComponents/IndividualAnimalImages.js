import React from 'react';
import Image from 'next/image';

const IndividualAnimalImages = ({ result }) => {
	// const getIndividualPhotos = () => {
	// 	const selectedImages = [];
	// 		for (const image of result.photos) {
	// 			selectedImages.push(image.full);
	// 		}
	// 	return selectedImages;
	// };
	// const photos = getIndividualPhotos();
	// console.log(photos);

	return <Image layout="intrinsic" src={result} width={500} height={500} />;
};
export default IndividualAnimalImages;
