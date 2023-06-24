import React from "react";
import PropTypes from "prop-types";

const Pagination = ({
    filteredProducts,
    pageLimit,
    pageNeighbours,
    currentPage,
    handlePageChange,
    alignment,
}) => {
    // Calculate the total number of pages
    const totalPages = Math.ceil(filteredProducts.length / pageLimit);
    if (totalPages <= 1 ) {
        return null;
      }

    // Helper function to check if a page is active
    const isPageActive = (page) => {
        return page === currentPage ? "active" : "";
    };

    // Helper function to handle page navigation
    const goToPage = (page) => {
        handlePageChange(page);
    };

    // Generate an array of page numbers to display
    const getPageNumbers = () => {
        const totalPageNumbers = pageNeighbours * 2 + 1;
        const totalBlocks = totalPageNumbers + 2; // Plus 2 for the first and last page

        if (totalPages > totalBlocks) {
            let pages = [];

            // Calculate the start and end page numbers
            const startPage = Math.max(2, currentPage - pageNeighbours);
            const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);

            // Add the first page
            pages.push(1);

            // Add the page numbers within the range
            for (let page = startPage; page <= endPage; page++) {
                pages.push(page);
            }

            // Add the last page
            pages.push(totalPages);

            return pages;
        }

        // If the total number of pages is less than or equal to the total blocks, display all pages
        return [...Array(totalPages).keys()].map((page) => page + 1);
    };

    // Get the array of page numbers
    const pageNumbers = getPageNumbers();
    console.log(filteredProducts,
        pageLimit,
        pageNeighbours,
        currentPage,);
    return (
        <ul className={`pagination ${alignment}`}>
            {/* Previous Page */}
            <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                onClick={() => goToPage(currentPage - 1)}
            >
                <a className="page-link" href="#!" tabIndex="-1">
                    Previous
                </a>
            </li>

            {/* Page Numbers */}
            {pageNumbers.map((page) => (
                <li
                    key={page}
                    className={`page-item ${isPageActive(page)}`}
                    onClick={() => goToPage(page)}
                >
                    <a className="page-link" href="#!">
                        {page}
                    </a>
                </li>
            ))}

            {/* Next Page */}
            <li
                className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
                onClick={() => goToPage(currentPage + 1)}
            >
                <a className="page-link" href="#!">
                    Next
                </a>
            </li>
        </ul>
    );
};

Pagination.propTypes = {
    filteredProducts: PropTypes.object.isRequired,
    pageLimit: PropTypes.number.isRequired,
    pageNeighbours: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    handlePageChange: PropTypes.func.isRequired,
    alignment: PropTypes.string,
};

export default Pagination;
