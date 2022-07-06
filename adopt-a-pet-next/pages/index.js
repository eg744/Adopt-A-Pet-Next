import Head from 'next/head';
// import Image from 'next/image';
import styles from '../styles/Home.module.css';
// import ArticleList from '../components/ArticleList';

// Pages are react components. Created components folder for non page components

// Articles passed from api call
export default function Home({ articles }) {
   return (
      // <div className={styles.container}>
      <div>
         <Head>
            <title>Create Next App </title>
            <meta
               name="keywords"
               content="pet adoption, adopt-a-pet, petfinder"
            />
            <link rel="icon" href="/favicon.ico" />
         </Head>
         <h1>hello next</h1>
         {/* <ArticleList articles={articles} /> */}
      </div>
   );
}

export const getStaticProps = async () => {
   // Example static api call response
   const response = await fetch(
      'https://jsonplaceholder.typicode.com/posts?_limit=6'
   );

   const articles = await response.json();

   // Return object with props object containing what was fetched.
   return {
      props: {
         articles,
      },
   };
};
