import React from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

const Pagination = ({
  reviewsPerPage,
  reviewsLength,
  currentPage,
  setCurrentReview,
  currentReviews,
}: any) => {
  let pageNumbers = [];
  for (let i = 1; i <= Math.ceil(reviewsLength / reviewsPerPage); i++) {
    pageNumbers.push(i);
  }
  console.log("reviews per page", reviewsPerPage);
  console.log("crnt reviews", reviewsLength);
  console.log(currentPage);
  return (
    <div className="flex justify-center gap-4 border-t border-neutral-200 pt-4">
      <button
        className={`${currentPage === 1 ? "opacity-50" : ""}`}
        onClick={() => {
          setCurrentReview((prev: number) => prev - 1);
        }}
        disabled={currentPage === 1}
      >
        <FaAngleLeft size={"1.5rem"} />
      </button>
      <div className="flex place-items-center gap-4">
        {pageNumbers.map((page, idx) => (
          <button
            onClick={() => {
              setCurrentReview(page);
            }}
            key={page}
            className={`${
              page === currentPage
                ? "text-xl pb-2 font-medium underline"
                : "text-lg"
            }`}
          >
            {page}
          </button>
        ))}
      </div>
      <button
        className={`${currentPage === pageNumbers.length ? "opacity-50" : ""}`}
        onClick={() => {
          setCurrentReview((prev: number) => prev + 1);
        }}
        disabled={currentPage === pageNumbers.length}
      >
        <FaAngleRight size={"1.5rem"} />
      </button>
    </div>
  );
};

export default Pagination;
