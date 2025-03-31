"use client";
import React, { Fragment, useRef, useState } from "react";
import data from "@/data/products.json";
import Product from "./Product";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

const Products = () => {
  const [sortByProduct, setSortbyProduct] = useState<string[]>([]);
  const [openProductSort, setOpenProductSort] = useState(false);
  let categories = [
    ...new Set(Object.values(data.map((product) => product.category))),
  ];

  let productView = sortByProduct.length
    ? data.filter((product) => sortByProduct.includes(product.category))
    : data;

  const ohHandleSortBy = (category: string) => {
    if (sortByProduct.includes(category)) {
      let updateSort = sortByProduct.filter((cat) => cat !== category);
      setSortbyProduct(updateSort);
    } else {
      setSortbyProduct([...sortByProduct, category]);
    }
  };

  const sortByRef = useRef(null);

  return (
    <div className="flex gap-4">
      <div className="flex flex-col w-60">
        <div
          className="flex justify-between cursor-pointer"
          onClick={() => setOpenProductSort(!openProductSort)}
        >
          <button type="button">PRODUCTS</button>
          {openProductSort ? (
            <IoIosArrowUp size={"1.25rem"} />
          ) : (
            <IoIosArrowDown size={"1.25rem"} />
          )}
        </div>
        {openProductSort &&
          categories.map((category, idx) => (
            <div
              ref={sortByRef}
              key={idx}
              className="flex gap-2 cursor-pointer w-full"
              onClick={() => ohHandleSortBy(category)}
            >
              <input
                type="checkbox"
                value={category}
                checked={sortByProduct.includes(category) ? true : false}
                readOnly
              />
              <label
                htmlFor="category"
                className={`${
                  sortByProduct.includes(category) ? "font-bold" : ""
                }`}
              >
                {category} (
                {data.filter((product) => product.category === category).length}
                )
              </label>
            </div>
          ))}
      </div>
      <div>
        <span>{productView.length} products</span>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 overflow-auto">
          {productView.map((product) => (
            <Fragment key={product.id}>
              <Product product={product} />
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
