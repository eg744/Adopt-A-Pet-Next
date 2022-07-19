import { useEffect, createContext, useState } from 'react';
import '../styles/globals.css';
import Layout from '../components/Layout';

export const PetFinderAuthContext = createContext();

function MyApp({ Component, pageProps }) {
	// Store and update access token
	const [accessToken, setAccessToken] = useState(null);

	useEffect(() => {
		const abortController = new AbortController();

		// Request access token
		const fetchToken = async () => {
			const res = await fetch('/api/pf-oauth-token', {
				signal: abortController.signal,
			});

			const resJson = await res.json();

			console.log(resJson);

			// update oauth access_token from pf server
			setAccessToken(resJson.access_token);

			// Cleanup
			return () => abortController.abort();
		};
		fetchToken();
		// Run on mount
	}, []);

	return (
		<div>
			{/* Oauth token global, any component can make API request. */}
			<PetFinderAuthContext.Provider value={accessToken}>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</PetFinderAuthContext.Provider>
		</div>
	);
}

export default MyApp;
