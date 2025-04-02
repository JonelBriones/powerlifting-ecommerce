import { Review } from "@/_types/reviews";
import React, { Fragment, useEffect, useState } from "react";
import { RiStarSFill } from "react-icons/ri";
import { RiStarSLine } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const ProductReview = ({ reviews }: { reviews: Review[] }) => {
  const [page, setPage] = useState(1);
  const totalPerPage = 3;
  const [firstReview, setfirstReview] = useState(0);
  const [lastReview, setLastReview] = useState(totalPerPage);
  const totalReview = (
    reviews.reduce((a, b) => b.rating + a, 0) / reviews.length
  ).toFixed(2);
  const getStarPercentage = (idxr: number) => {
    const startCount = reviews.filter(
      (review) => review.rating === idxr + 1
    ).length;
    return startCount > 0 ? (startCount / reviews.length) * 100 : 0;
  };
  const starRating = Array(5)
    .fill(0)
    .map((_, idxr) => (
      <div className="flex gap-4 place-items-center" key={idxr}>
        <div className="flex">
          {Array(5)
            .fill(0)
            .map((_, idx) => (
              <Fragment key={idx}>
                {idx <= idxr ? (
                  <RiStarSFill size={"1.25rem"} />
                ) : (
                  <RiStarSLine size={"1.25rem"} />
                )}
              </Fragment>
            ))}
        </div>
        <div className="h-full w-36 bg-neutral-100">
          <div
            className="bg-black h-full"
            style={{
              width: getStarPercentage(idxr),
            }}
          />
        </div>
        <div>
          {reviews.filter((review) => review.rating === idxr + 1).length}
        </div>
      </div>
    ))
    .reverse();

  function showPage(k) {}

  return (
    <div className="flex place-items-center flex-col gap-4">
      <div className="flex flex-col gap-4 my-6 w-full place-items-center">
        <h4 className="text-3xl tracking-widest">CUSTOMER REVIEWS</h4>
        <div className="flex place-items-center flex-col tracking-wider">
          <div className="flex gap-2">
            <span className="flex">
              {Array(Math.floor(parseFloat(totalReview)))
                .fill(0)
                .map((_, idx) => (
                  <Fragment key={idx}>
                    <RiStarSFill size={"1.5rem"} />
                  </Fragment>
                ))}
            </span>
            <span className="text-lg">{totalReview} out of 5</span>
          </div>
          <span className="text-lg tracking-wider">
            Based on {reviews.length} reviews
          </span>
        </div>
        <div className="flex flex-col gap-2">{starRating}</div>
        <button className="border p-4 font-bold tracking-widest bg-black text-white w-full">
          Write a review
        </button>
      </div>
      <div className="flex flex-col gap-8">
        {reviews.slice(firstReview, lastReview).map((review, idx) => (
          <div key={review.id}>
            <div className="flex flex-col gap-2 border-t border-neutral-200 pt-4">
              <div className="flex justify-between">
                <span className="flex">
                  {new Array(review.rating).fill(0).map((_, idx) => (
                    <Fragment key={idx}>
                      <RiStarSFill size={"1.5rem"} />
                    </Fragment>
                  ))}
                </span>
                <span className="text-steel-gray text-sm tracking-wider">
                  {new Date(review.date).toLocaleDateString("en-us", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="flex place-items-center gap-2">
                <FaRegUser size={"1rem"} />

                <span>{review.name}</span>
                <span className="bg-black text-white px-2 text-sm font-thin">
                  Verified
                </span>
              </div>
              <h5 className="font-semibold text-lg">{review.title}</h5>
              <p className="text-dark-gray">{review.comment}</p>
            </div>
          </div>
        ))}
        <div className="flex">
          <span>{page}</span>
          <button
            className={`${page === 1 ? "opacity-50" : ""}`}
            onClick={() => {
              setfirstReview((prev) => prev - totalPerPage);
              setLastReview((prev) => prev - totalPerPage);
              setPage((prev) => prev - 1);
            }}
            disabled={page === 1}
          >
            <FaAngleLeft size={"1.5rem"} />
          </button>
          {/* <span>{page}</span> */}
          <div className="flex place-items-center gap-2">
            {Array(2)
              .fill(0)
              .map((_, idx) => (
                <span
                  key={idx + 1}
                  className={`${
                    page === idx + 1
                      ? "text-xl font-medium underline"
                      : "text-lg"
                  }`}
                >
                  {idx + 1}
                </span>
              ))}
          </div>
          <button
            className={`${page * 3 >= reviews.length ? "opacity-50" : ""}`}
            onClick={() => {
              setfirstReview((prev) => prev + totalPerPage);
              setLastReview((prev) => prev + totalPerPage);
              setPage((prev) => prev + 1);
            }}
            disabled={page * 3 >= reviews.length}
          >
            <FaAngleRight size={"1.5rem"} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductReview;
