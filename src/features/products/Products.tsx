"use client";
import React, { Fragment, useRef, useState } from "react";
import data from "@/data/products.json";
import Product from "./Product";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { VscSettings } from "react-icons/vsc";

const Products = () => {
  const [sortByProduct, setSortbyProduct] = useState<string[]>([]);
  const [sortByCollection, setSortbyCollection] = useState<string[]>([]);
  const [openProductSort, setOpenProductSort] = useState(false);
  const [openCollectionSort, setOpenCollectionSort] = useState(false);
  let categories = [
    ...new Set(Object.values(data.map((product) => product.category))),
  ];
  let collections = [
    ...new Set(
      Object.values(
        data
          .filter((product) => product.collection)
          .map((product) => product.collection)
      )
    ),
  ];

  let collectionView = sortByCollection.length
    ? data.filter((product) => product.collection)
    : data;

  let productView = sortByProduct.length
    ? collectionView.filter((product) =>
        sortByProduct.includes(product.category)
      )
    : collectionView;

  const ohHandleSortBy = (sortBy: string[], fn, category: string) => {
    if (sortBy.includes(category)) {
      let updateSort = sortBy.filter((cat) => cat !== category);
      fn(updateSort);
    } else {
      fn([...sortByProduct, category]);
    }
  };
  // ON COLLECTION SELECT, FILTER OUT PRODUCT LIST THAT IS NOT IN COLLECTION

  const sortByRef = useRef(null);
  const sortByCollectionRef = useRef(null);

  return (
    <div className="flex gap-4">
      <div className="hidden md:flex flex-col w-60">
        <div
          className="flex justify-between cursor-pointer"
          onClick={() => setOpenCollectionSort(!openCollectionSort)}
        >
          <button type="button">COLLECTIONS</button>
          {openCollectionSort ? (
            <IoIosArrowUp size={"1.25rem"} />
          ) : (
            <IoIosArrowDown size={"1.25rem"} />
          )}
        </div>
        {openCollectionSort &&
          collections.map((collection, idx) => (
            <div
              ref={sortByCollectionRef}
              key={idx}
              className="flex gap-2 cursor-pointer w-full"
              onClick={() =>
                ohHandleSortBy(
                  sortByCollection,
                  setSortbyCollection,
                  collection
                )
              }
            >
              <input
                type="checkbox"
                value={collection}
                checked={sortByCollection.includes(collection) ? true : false}
                className=" cursor-pointer"
                readOnly
              />
              <label
                htmlFor="category"
                className={`cursor-pointer ${
                  sortByCollection.includes(collection) ? "font-bold" : ""
                }`}
              >
                {collection} (
                {
                  data.filter((product) => product.category === collection)
                    .length
                }
                )
              </label>
            </div>
          ))}
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
              onClick={() =>
                ohHandleSortBy(sortByProduct, setSortbyProduct, category)
              }
            >
              <input
                type="checkbox"
                value={category}
                checked={sortByProduct.includes(category) ? true : false}
                className=" cursor-pointer"
                readOnly
              />
              <label
                htmlFor="category"
                className={`cursor-pointer ${
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
      <div className="m-auto md:m-0 flex flex-col gap-4">
        <div className="md:hidden border p-3 flex gap-4 place-items-center w-1/2 cursor-pointer">
          <VscSettings size={"1.25rem"} /> Filter
        </div>
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
