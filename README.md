Pet adoption website using Next.js framework and Petfinder's API for content. 

Version 1.0

View on Vercel at http://adopt-a-pet-bice.vercel.app/

Search for different types and breeds of animals that are available for adoption near you. View each animal individually and see which shelter or organization they're at.

Search for organizations in your area and see what animals they have available for adoption. View each organization to see their contact information.

Each animal and organization page includes a link to their full bio on Petfinder's website, as well as the organization's website if available.

Petfinder API requires key and secret. Oauth request created in pages\api\pf-oauth-token.js and called in pages_app.js. Token is passed to the rest of the app with React Context so any component can make API requests.

Using Styled-Components library for nav bar and React-Select library for animal type and breed selection/search bars. Aside from components included with Next, React, and provided React hooks, I wrote the React components and CSS myself.

This was an excellent learning experience getting more familiar with React, especially using hooks. The Next.js framework provided plenty of useful tools, I primarily used features for the front-end in this project but I can see Next provides excellent back-end tools and environment which I will enjoy exploring further. 

I was inspired to create this project in part from a friend, and a family member both looking to adopt a new dog earlier in 2022. I had the idea for this kind of website, looked to see if there was an API that would fit me and found Petfinder's API which was an absolutely perfect fit for the kind of site I wanted to make. I'm happy to say my friend and family member both found the right rescue dogs for them and love them very much. 
