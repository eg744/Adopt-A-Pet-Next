import cardStyles from '../styles/ResultGrid.module.css';
import Image from 'next/image';

const AnimalImage = (props) => {
	const { result } = props;

	// Verify photos exist
	if (result.photos[0] && result.photos[0].full) {
		return (
			<div className={cardStyles.image}>
				<Image
					src={result.photos[0].full}
					width={300}
					height={300}
					alt="A cute animal for adoption"
				/>
			</div>
		);
	} else {
		return (
			<div className={cardStyles.image}>
				<span>No image found</span>
			</div>
		);
	}
};

export default AnimalImage;
