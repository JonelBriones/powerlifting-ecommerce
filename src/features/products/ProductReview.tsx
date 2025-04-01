import { Review } from "@/_types/reviews";
import React, { Fragment } from "react";
import { RiStarSFill } from "react-icons/ri";

const ProductReview = ({ reviews }: { reviews: Review[] }) => {
  const totalReview = (
    reviews.reduce((a, b) => b.rating + a, 0) / reviews.length
  ).toFixed(2);
  return (
    <div className="flex flex-col gap-4">
      <h5>CUSTOMER REVIEWS</h5>
      <div className="flex gap-4">
        <span>stars</span>
        <span>{totalReview} out of 5</span>
      </div>
      <span>Based on {reviews.length} reviews</span>
      <div> average stars</div>
      <button className="border p-4 font-bold tracking-widest bg-black text-white w-full">
        Write a review
      </button>
      <div className="flex flex-col gap-8">
        {reviews.map((review) => (
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
                <span className="text-steel-gray">
                  {new Date(review.date).toLocaleDateString("en-us", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="flex place-items-center gap-2">
                <div className="size-10 border">img</div>
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
      </div>
    </div>
  );
};

export default ProductReview;
