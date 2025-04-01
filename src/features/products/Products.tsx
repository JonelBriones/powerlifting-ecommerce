"use client";
import React, { Fragment, useEffect, useRef, useState } from "react";
import data from "@/data/products.json";
import Product from "./Product";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { VscSettings } from "react-icons/vsc";
import Footer from "../footer/Footer";
import { FaXmark } from "react-icons/fa6";
import ProductQuickview from "./ProductReview";
import ProductView from "./ProductView";
import { ProductT } from "@/_types/products";

const Products = () => {
  const [sortByProduct, setSortbyProduct] = useState<string[]>([]);
  const [sortByCollection, setSortbyCollection] = useState<string[]>([]);
  const [openProductSort, setOpenProductSort] = useState(false);
  const [openCollectionSort, setOpenCollectionSort] = useState(false);

  // on filter collections on product filter, vice versa
  let collections = [
    ...new Set(
      Object.values(
        data
          .filter((product) => product.collection)
          .map((product) => product.collection)
      )
    ),
  ];

  let filteredProducts = [
    ...new Set(
      Object.values(
        data
          .filter(
            (product) =>
              sortByCollection.length &&
              collections.includes(product.collection)
          )
          .map((item) => item.category)
      )
    ),
  ];

  let categories = sortByCollection?.length
    ? filteredProducts
    : [...new Set(Object.values(data.map((product) => product.category)))];

  let collectionView = sortByCollection.length
    ? data.filter((product) => product.collection)
    : data;

  let productView = sortByProduct.length
    ? collectionView.filter((product) =>
        sortByProduct.includes(product.category)
      )
    : collectionView;
  console.log("product view", productView);
  const ohHandleSortBy = (
    sortBy: string[],
    fn: React.Dispatch<React.SetStateAction<string[]>>,
    category: string | undefined
  ) => {
    if (!category) return;
    if (sortBy.includes(category)) {
      let updateSort = sortBy.filter((cat) => cat !== category);
      fn(updateSort);
    } else {
      fn([...sortByProduct, category]);
    }
  };
  const [toggleQuickview, setToggleQuickview] = useState<ProductT | null>(null);

  const [showBackTopBtn, setShowBackTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackTopBtn(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`relative h-[calc(100vh-160px)]  ${
        toggleQuickview ? "overflow-hidden" : ""
      }`}
    >
      {toggleQuickview && (
        <div className="absolute top-0 h-full left-0 right-0 bg-black opacity-40 z-10 " />
      )}
      <div className={``}>
        <a
          href="#top"
          className={`fixed top-50 right-6 bg-primary-red text-white px-4 py-2 rounded shadow-lg transition z-50 $transition ease-linear duration-150 ${
            showBackTopBtn ? "opacity-100" : "opacity-0"
          }`}
        >
          ↑ Top
        </a>
      </div>
      <div className="flex gap-4 w-full  max-w-[1280px] m-auto p-4 flex-1">
        <div className="hidden md:flex flex-col w-60 select-none">
          <div
            className="flex justify-between cursor-pointer mb-2"
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
            collections.map(
              (collection, idx) =>
                collection && (
                  <div
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
                      checked={
                        sortByCollection.includes(collection) ? true : false
                      }
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
                        data.filter(
                          (product) => product.collection === collection
                        ).length
                      }
                      )
                    </label>
                  </div>
                )
            )}
          <hr className="my-4" />
          <div
            className="flex justify-between cursor-pointer mb-2"
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
                  {
                    data.filter((product) => product.category === category)
                      .length
                  }
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
                <Product
                  product={product}
                  setToggleQuickview={setToggleQuickview}
                />
              </Fragment>
            ))}
          </div>
        </div>
      </div>

      {toggleQuickview ? (
        <Fragment>
          <div
            className={`top-0 left-0 right-0 delay-100 z-10 flex justify-center bottom-0 ${
              toggleQuickview?.id
                ? "opacity-100 translate-y-0 w-full absolute block"
                : "opacity-0 translate-y-100"
            } transition ease-linear transform duration-200`}
          >
            <div className="flex place-items-center justify-center bg-white w-[1280px] relative overflow-auto lg:h-[900px]">
              <ProductView product={toggleQuickview} />
              <button
                onClick={() => setToggleQuickview(null)}
                className="absolute top-2 right-2"
              >
                <FaXmark
                  size={"1.5rem"}
                  className="rotate-180 hover:rotate-0 transform ease-in duration-200"
                />
              </button>
            </div>
          </div>
        </Fragment>
      ) : (
        <></>
      )}
      <Footer />
    </div>
  );
};

export default Products;
