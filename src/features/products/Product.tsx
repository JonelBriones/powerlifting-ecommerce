import { ProductT } from "@/_types/products";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
type Params = {
  product: ProductT;
  setToggleQuickview: any;
};
const Product = ({ product, setToggleQuickview }: Params) => {
  const [hoverView, setHoverView] = useState(false);

  return (
    <div
      className="flex flex-col max-w-70"
      onMouseEnter={() => setHoverView(true)}
      onMouseLeave={() => setHoverView(false)}
    >
      <div className="relative z-0">
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
        <button
          onClick={() => setToggleQuickview(product)}
          className={`absolute z-100  left-0 right-0 mx-4 bottom-0 p-2 text-center text-white bg-primary-red cursor-default ${
            hoverView ? "-translate-y-4 opacity-100" : "translate-y-0 opacity-0"
          } transition ease-linear transform `}
        >
          View
        </button>
      </div>
      <span className="font-semibold text-lg text-center inline text-wrap">
        {product.name}
      </span>
      <span className="text-red-700 text-center">${product.price}</span>
    </div>
  );
};

export default Product;
