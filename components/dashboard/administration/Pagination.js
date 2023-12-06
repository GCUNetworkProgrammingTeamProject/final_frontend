
import React from "react";

function Pagination({ currentPage, totalPages, onPageChange }) {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <ul className="pagination">
            {pageNumbers.map((page) => (
                <li key={page} className={`page-item ${currentPage === page ? "active" : ""}`}>
                    <a
                        href="#"
                        className="page-link"
                        onClick={(e) => {
                            e.preventDefault();
                            onPageChange(page);
                        }}
                    >
                        {page}
                    </a>
                </li>
            ))}
        </ul>
    );
}

export default Pagination;
