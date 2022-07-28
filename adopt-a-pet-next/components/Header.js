import headerStyles from '../styles/Header.module.css';

const header = () => {
	return (
		<div className={headerStyles.wrapper}>
			<h1 className={headerStyles.title}>
				<span>Adopt-A-Pet </span>
			</h1>
			<p className={headerStyles.description}>
				Find your next best friend
			</p>
		</div>
	);
};

export default header;
