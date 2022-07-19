import Head from 'next/head';
// import Image from 'next/image';
import homeStyles from '../styles/Home.module.css';
// import ArticleList from '../components/ArticleList';

// Pages are react components. Created components folder for non page components

// Articles passed from api call
export default function Home({ articles }) {
	return (
		// <div className={styles.container}>
		<div className={homeStyles.container}>
			<Head>
				<title>AdoptAPet </title>
				<meta
					name="keywords"
					content="pet adoption, adopt-a-pet, petfinder"
				/>
				<link rel="icon" href="\assets\aapTitleLogoTransparent.png" />

				{/* <link rel="icon" href="/assets/adoptapetLogo.png" />  */}
			</Head>

			<h1>Featured Animals</h1>
			<ul className={homeStyles.featured}>
				<li>Dog</li>
				<li>Cat</li>
				<li>Other</li>
			</ul>
		</div>
	);
}
