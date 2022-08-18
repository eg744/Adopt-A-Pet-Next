// I want this to be resuable function to fetch

// think this will be helpful https://medium.com/swlh/creating-react-hook-for-fetching-data-4193d8479138
export const fetchAnimals = async (token) => {
	const animalData = await fetch(
		// request structure: "Authorization: Bearer {YOUR_ACCESS_TOKEN}" GET https://api.petfinder.com/v2/{CATEGORY}/{ACTION}?{parameter_1}={value_1}&{parameter_2}={value_2}
		// https://www.petfinder.com/developers/v2/docs/#request-structure

		`${petfinderUrls.animals}`,
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	);

	const animalTypes = await fetch(`${petfinderUrls.types}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	const animalDataJson = await animalData.json();
	const animalTypesJson = await animalTypes.json();

	setResults(animalDataJson.animals);
	setPetTypesAvailable(animalTypesJson.types);
};

const useApiRequest = (url) => {
	const [data, setData] = useState([]);
	const [isLoaded, setIsLoaded] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchData = () => {
			axios
				.get(url)
				.then((response) => {
					setIsLoaded(true);
					setData(response.data);
				})
				.catch((error) => {
					setError(error);
				});
		};
		fetchData();
	}, [url]);

	return { error, isLoaded, data };
};
