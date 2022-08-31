import { useRouter } from 'next/router';
function AnimalTypePage() {
	const router = useRouter();
	console.log(router);
	console.log('route type', router.query.animalType);
	console.log('route breed', router.query.animalBreed);

	return <h1>dynamicanimalTypepage</h1>;
}
export default AnimalTypePage;
