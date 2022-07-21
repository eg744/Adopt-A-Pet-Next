import cardStyles from '../styles/ResultGrid.module.css';

const AnimalImage = (props) => {
	const { result } = props;

	// Verify photos exist
	if (result.photos[0] && result.photos[0].full) {
		return (
			<img
				className={cardStyles.image}
				src={result.photos[0].medium}
			></img>
		);
	} else {
		return (
			<div className={cardStyles.image}>
				<p>No image found</p>
			</div>
		);
	}
};

export default AnimalImage;
