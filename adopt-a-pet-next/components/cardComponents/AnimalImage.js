import cardStyles from '/styles/ResultGrid.module.css';
import Image from 'next/image';
import Link from 'next/link';

const AnimalImage = (props) => {
	const { result } = props;

	// Verify photos exist
	if (result.photos[0] && result.photos[0].full) {
		return (
			<div className={cardStyles.image}>
				<Image
					layout="intrinsic"
					src={result.photos[0].full}
					width={500}
					height={500}
					alt={`A cute animal for adoption named ${result.name}. View at ${result.url}`}
				/>
			</div>
		);
	} else {
		return (
			<div className={cardStyles.image}>
				<span>{`No images found for ${result.name}`}</span>
			</div>
		);
	}
};

export default AnimalImage;
