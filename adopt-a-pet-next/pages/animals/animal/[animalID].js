// Dynamic route for animal with unique id

import Router from 'next/dist/server/router';
import { useRouter } from 'next/Router';
import Link from 'next/link';

// Router can display route parameter(animal id)

const AnimalDetails = () => {
	const router = useRouter();

	// Route animalID specified by filename [animalID]
	const animalId = router.query.animalID;
	// return obj, empty during pre-rendering if does not use server side rendering

	// Api call using animal id here
	return (
		<div>
			unique animal ID: {animalId}
			<div>
				<Link href="/">Go Home</Link>
			</div>
		</div>
	);
};
export default AnimalDetails;
