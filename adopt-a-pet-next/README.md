Creating pet adoption website using Next.js framework and Petfinder's API for content. 

View on Vercel at http://adopt-a-pet-bice.vercel.app/

Search for different types and breeds of animals that are available for adoption near you. View each animal individually and see which shelter or organization they're at. 

Search for organizations in your area and see what animals they have available for adoption. View each organization to see their contact information.

Each animal and organization page includes a link to their full bio on Petfinder's website, as well as the organization's website if available.

Petfinder API requires key and secret. Oauth request created in pages\api\pf-oauth-token.js and called in pages\_app.js. Token is passed to the rest of the app with React Context so any component can make API requests.

Using Styled-Components library for nav bar and React-Select library for animal type and breed selection/search bars. Aside from components included with Next, React, and provided React hooks, I wrote the React components and CSS myself.


