"use server";
import ProductView from "@/features/products/ProductView";
import React from "react";
import data from "@/data/products.json";
import reviewsData from "@/data/reviews.json";

const page = async ({ params }: { params: { product_name: string } }) => {
  const { category, product_name } =
    params instanceof Promise ? await params : params;

  const product = data.find(
    (product) => product.name === product_name.split("%20").join(" ")
  );

  if (!product) return <div>could not find product</div>;

  const reviews =
    reviewsData[category.toLowerCase() as keyof typeof reviewsData] || [];

  return <ProductView product={product} reviews={reviews} />;
};

export default page;
