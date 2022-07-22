import Head from 'next/head';
import Image from 'next/image';
import homeStyles from '../styles/Home.module.css';
// import ArticleList from '../components/ArticleList';
import adoptapetHeroBanner from '../public/assets/adoptapetHeroBanner.png';

// Props passed from api call
export default function Home({ props }) {
	return (
		// <div className={styles.container}>
		<div className={homeStyles.container}>
			<Head>
				<title>Adopt-A-Pet </title>
				<meta
					name="keywords"
					content="pet adoption, adopt-a-pet, petfinder"
				/>
				<link rel="icon" href="\assets\aapTitleLogoTransparent.png" />

				{/* <link rel="icon" href="/assets/adoptapetLogo.png" />  */}
			</Head>
			<Image src={adoptapetHeroBanner} />

			<h1 className={homeStyles.headline}></h1>
			<h2>Featured Animals</h2>
			<ul className={homeStyles.featured}>
				<li>Dog</li>
				<li>Cat</li>
				<li>Other</li>
			</ul>
		</div>
	);
}
