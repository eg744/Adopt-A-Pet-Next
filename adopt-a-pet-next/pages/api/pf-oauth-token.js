// Oauth token API route

// Structure "grant_type=client_credentials&client_id={CLIENT-ID}&client_secret={CLIENT-SECRET}"
const oauthToken = async (req, res) => {
	const params = new URLSearchParams();
	params.append('grant_type', 'client_credentials');
	params.append('client_id', process.env.PETFINDER_API_KEY);
	params.append('client_secret', process.env.PETFINDER_SECRET_KEY);
	const petfinderResponse = await fetch(
		'https://api.petfinder.com/v2/oauth2/token',
		{
			method: 'POST',
			body: params,
		}
	);
	const petFinderData = await petfinderResponse.json();
	res.send(petFinderData);
};
export default oauthToken;
