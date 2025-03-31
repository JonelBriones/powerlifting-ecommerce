import { ProductT } from "@/_types/products";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Product = ({ product }: { product: ProductT }) => {
  return (
    <div className="flex flex-col max-w-70">
      <Link href={`/collections/${product.category}/${product.name}`}>
        <Image
          src={
            "/images/Powerlifting Knee Sleeves – SBD Apparel USA_files/7mm-Powerlifting-Knee-Sleeves-01.jpg"
          }
          width={0}
          height={0}
          sizes="100vh"
          alt={product.image}
          className="w-full"
        />
      </Link>
      <span className="font-semibold text-lg text-center inline text-wrap">
        {product.name}
      </span>
      <span className="text-red-700 text-center">${product.price}</span>
    </div>
  );
};

export default Product;
