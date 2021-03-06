import { petFinderAPIKey, petFinderSecretKey } from '../../api-keys';

// Oauth token API route

// Structure "grant_type=client_credentials&client_id={CLIENT-ID}&client_secret={CLIENT-SECRET}" https://api.petfinder.com/v2/oauth2/token
export default async (req, res) => {
	const params = new URLSearchParams();
	params.append('grant_type', 'client_credentials');
	params.append('client_id', petFinderAPIKey);
	params.append('client_secret', petFinderSecretKey);
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
