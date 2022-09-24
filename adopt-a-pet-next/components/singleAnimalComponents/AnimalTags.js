import React from 'react';

const AnimalTags = ({ tag }) => {
	console.log('tags', tag);
	return <li>{tag}</li>;
};

export default AnimalTags;
