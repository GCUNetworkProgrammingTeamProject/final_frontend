import React from "react";

export default function Pagination({ currentPage, postsPerPage, totalPosts, paginate }) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="pagination -buttons">
            <button
                className="pagination__button -prev"
                onClick={() => {
                    if (currentPage > 1) {
                        paginate(currentPage - 1);
                    }
                }}
            >
                <i className="icon icon-chevron-left"></i>
            </button>

            <div className="pagination__count">
                {pageNumbers.map((number) => (
                    <a
                        style={{cursor: "pointer"} }
                        key={number}
                        className={number === currentPage ? "-count-is-active" : ""}
                        onClick={() => paginate(number)}
                    >
                        {number}
                    </a>
                ))}
            </div>

            <button
                className="pagination__button -next"
                onClick={() => {
                    if (currentPage < Math.ceil(totalPosts / postsPerPage)) {
                        paginate(currentPage + 1);
                    }
                }}
            >
                <i className="icon icon-chevron-right"></i>
            </button>
        </div>
    );
}
