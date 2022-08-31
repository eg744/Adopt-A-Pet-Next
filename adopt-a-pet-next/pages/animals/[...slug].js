import { useRouter } from 'next/router';

const Slug = () => {
	const router = useRouter();
	console.log(router);
	return (
		<div>
			<h1>animaldetails: slug page </h1>
		</div>
	);
};
export default Slug;
