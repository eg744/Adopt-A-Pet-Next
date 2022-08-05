// root for animal page
import Link from 'next/link';
import ResultPage from '../../components/Result-page';
import React from 'react';
import { defaultHead } from 'next/head';

function AnimalIndex() {
	return <div>hello</div>;
}
export default AnimalIndex;

// example getstaticprops
// function Users({ users }) {
// 	// console.log(animals);

// 	return (
// 		<div>
// 			<h1>user list</h1>

// 			{users.map((animal) => {
// 				return (
// 					<div key={animal.id}>
// 						<p>{animal.id}</p>
// 					</div>
// 				);
// 			})}
// 		</div>
// 	);
// }

// export const getStaticProps = async () => {
// 	const response = await fetch('https://jsonplaceholder.typicode.com/users');

// 	const posts = await response.json();
// 	console.log('posts', posts);
// 	return {
// 		props: {
// 			users: posts,
// 		},
// 	};
// };
// export default Users;
