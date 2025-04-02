"use server";
import ProductView from "@/features/products/ProductView";
import React, { Fragment } from "react";
import data from "@/data/products.json";
import reviewsData from "@/data/reviews.json";
import Footer from "@/features/footer/Footer";

const page = async ({ params }: { params: { product_name: string } }) => {
  const { category, product_name } =
    params instanceof Promise ? await params : params;

  const product = data.find(
    (product) => product.name === product_name.split("%20").join(" ")
  );

  if (!product) return <div>could not find product</div>;

  const reviews =
    reviewsData[
      category.split("%20").join("_").toLowerCase() as keyof typeof reviewsData
    ] || [];
  console.log("category", category.split("%20").join("_").toLowerCase());
  console.log("reviews", reviewsData);
  console.log("product", product);
  const productReview = reviews.filter(
    (review) => review.productId === product.id
  );
  console.log("product reviews", productReview);
  return (
    <Fragment>
      <ProductView product={product} reviews={productReview} />
      <Footer />
    </Fragment>
  );
};

export default page;
