import React from 'react';
import pageStyles from '../../styles/PageButtons.module.css';

const PaginationButtons = ({
	data,
	handleNextPageChange,
	handlePreviousPageChange,
}) => {
	try {
		// These links may not exist
		// const nextPage =
		// 	typeof nextPage == 'undefined'
		// 		? ''
		// 		: data.pagination._links.next.href;

		const totalPages = data.pagination.total_pages;
		const currentPage = data.pagination.current_page;

		let nextPage;
		let previousPage;

		if (typeof nextPage == 'undefined' && totalPages > 1) {
			nextPage = data.pagination._links.next.href;
		}

		if (currentPage > 1) {
			previousPage = data.pagination._links.previous.href;
		}
		// Ugly if return chain. Not sure what best practice is.
		if (
			typeof nextPage !== 'undefined' &&
			typeof previousPage !== 'undefined'
		) {
			return (
				<div className={pageStyles.paginationButtons}>
					<a>
						<button
							className={pageStyles.previousButton}
							onClick={handlePreviousPageChange}
						>
							Previous Page
						</button>
					</a>
					<div>
						Page {currentPage} of {totalPages}
					</div>
					<a>
						<button
							className={pageStyles.nextButton}
							onClick={handleNextPageChange}
						>
							Next Page
						</button>
					</a>
				</div>
			);
		} else if (
			typeof nextPage !== 'undefined' &&
			typeof previousPage == 'undefined'
		) {
			return (
				<div className={pageStyles.paginationButtons}>
					<a>
						<div>
							Page {currentPage} of {totalPages}
						</div>
						<button
							className={pageStyles.nextButton}
							onClick={handleNextPageChange}
						>
							Next Page
						</button>
					</a>
				</div>
			);
		} else if (
			typeof previousPage !== 'undefined' &&
			typeof nextPage == 'undefined'
		) {
			return (
				<div className={pageStyles.paginationButtons}>
					<a>
						<button
							className={pageStyles.previousButton}
							onClick={handlePreviousPageChange}
						>
							Previous Page
						</button>
					</a>
					<div>
						Page {currentPage} of {totalPages}
					</div>
				</div>
			);
		} else {
			return (
				<div className={pageStyles.paginationButtons}>
					<div>
						Page {currentPage} of {totalPages}
					</div>
				</div>
			);
		}
	} catch (error) {
		console.error(error);
	}
};

export default PaginationButtons;
