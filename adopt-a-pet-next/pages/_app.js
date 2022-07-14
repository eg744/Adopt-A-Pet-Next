import { useEffect, createContext, useState } from 'react';
import '../styles/globals.css';
import Layout from '../components/Layout';

export const PetFinderAuthContext = createContext();

function MyApp({ Component, pageProps }) {
   const [accessToken, setAccessToken] = useState(null);

   // Request access token
   useEffect(() => {
      const fetchToken = async () => {
         const res = await fetch('/api/pf-oauth-token');

         const resJson = await res.json();

         console.log(resJson);

         // oauth access_token from pf server
         setAccessToken(resJson.access_token);
      };
      // fetchToken();
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
