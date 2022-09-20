import React from 'react';

const paginationButtons = ({ results }) => {
	const nextPage = page.pagination._links.next.href;
	// const previousPage = page.pagination._links.previous.href;

	const handleClick = (event) => {
		event.preventDefault();
	};
	const hasNextPage = (page) => {};
	if (nextPage) {
		return (
			<div className="Next button">
				<button></button>
			</div>
		);
	}
};

export default paginationButtons;
