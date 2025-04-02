"use client";
import { Products, ProductT } from "@/_types/products";
import { Review } from "@/_types/reviews";
import Image from "next/image";
import React, { Fragment, useState } from "react";
import { RiStarSFill } from "react-icons/ri";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import ProductReview from "./ProductReview";
import { usePathname } from "next/navigation";

const ProductView = ({
  product,
  reviews,
  children,
}: {
  product: ProductT;
  reviews: Review[];
  children?: React.ReactNode;
}) => {
  const pathname = usePathname();
  const { category, description, image, name, price, features, stock, fit } =
    product;
  const [toggleSizeGuide, setToggleSizeGuide] = useState(false);
  const [toggleMeasureGuide, setToggleMeasureGuide] = useState(false);
  const [toggleCareInstructions, setToggleCareInstructions] = useState(false);

  const handleToggleGuide = (guide: string) => {};
  const [selectSize, setSelectSize] = useState<string | null>(null);
  const [selectFit, setSelectFit] = useState<string | null>(null);
  // const totalReview =
  //   reviews &&
  //   (reviews.reduce((a, b) => b.rating + a, 0) / reviews.length).toFixed(2);

  const ToggleSection = ({
    label,
    isOpen,
    setIsOpen,
  }: {
    label: string;
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }) => (
    <div
      className={`flex justify-center border ${
        label !== "CARE INSTRUCTIONS" ? "border-b-0" : ""
      } p-4 text-center`}
      onClick={() => {
        console.log(label, isOpen);
        setIsOpen(!isOpen);
      }}
    >
      <span className="flex-1 cursor-pointer">{label}</span>
      {isOpen ? (
        <IoIosArrowUp size={"1.25rem"} className="cursor-pointer" />
      ) : (
        <IoIosArrowDown size={"1.25rem"} className="cursor-pointer" />
      )}
    </div>
  );
  console.log(reviews);

  const isSingleView = pathname.split("/").length === 4;
  console.log(product);
  const [mainImg, setMainImg] = useState(0);
  return (
    <div className="w-full max-w-[1536px] flex flex-col place-items-center md:place-items-stretch lg:m-auto md:flex-row gap-8 xl:border p-4 h-full pr-0 relative">
      <div className="md:flex gap-4 block md:sticky flex-1 h-full top-44">
        <div className="hidden md:flex flex-col gap-4 w-24">
          {product.images.map((image, idx) => (
            <Image
              key={idx}
              src={image}
              width={0}
              height={0}
              sizes="100vw"
              alt={image}
              className="w-full"
            />
          ))}
        </div>
        <div className="flex-1 h-full min-w-80 pr-4">
          <Image
            src={product.images[0]}
            width={0}
            height={0}
            sizes="100vw"
            alt={product.images[0]}
            className="w-full"
          />
        </div>
      </div>

      <div className="flex-1">
        <div className="flex flex-col gap-4 max-w-160 border-blue-200 text-left text-black h-full overflow-auto pr-4 md:pr-8 pb-8">
          <div className="md:block flex justify-center flex-col place-items-center md:place-items-stretch text-center md:text-left">
            <h2 className="font-medium tracking-widest inline text-wrap text-5xl">
              {name}
            </h2>
            <div className="flex flex-col">
              <span className="text-red-700">${price}</span>
              <span className="text-steel-gray font-medium">
                <span className="underline">Shipping</span> calculated at
                checkout.
              </span>
            </div>
          </div>
          <hr className="my-4" />
          {fit?.length && (
            <div className="flex flex-col gap-2">
              <span>PRODUCT FIT</span>
              <div className="flex flex-wrap gap-y-4">
                {fit.map((fit) => (
                  <button
                    key={fit}
                    className={`border px-4 py-2 font-medium mx-1 text-xl ${
                      selectFit === fit ? "outline" : ""
                    }`}
                    onClick={() => setSelectFit(fit)}
                  >
                    {fit}
                  </button>
                ))}
              </div>
            </div>
          )}
          {typeof stock !== "number" && (
            <div className="flex flex-col gap-2">
              <span>PRODUCT SIZE</span>
              <div className="flex flex-wrap gap-y-4">
                {Object.keys(stock).map((size) => (
                  <button
                    key={size}
                    className={`border px-4 py-2 font-medium mx-1 text-xl ${
                      selectSize === size ? "outline" : ""
                    }`}
                    onClick={() => setSelectSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-col gap-4">
            <button className="p-4 font-bold tracking-widest border">
              ADD TO CART
            </button>
            <button className="bg-purple-700 p-4 text-white font-bold">
              BY WITH SHOP PAY
            </button>
            <span className="underline text-center text-lg tracking-wid">
              More payment options
            </span>
            <p>
              Pay in 4 interest-free installments of $25.00 with(shop pay){" "}
              <button type="button" className="underline">
                Learn more
              </button>
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <p>{description}</p>
            <ul className="flex flex-col gap-2 ml-6">
              {features.map((feature) => (
                <li key={feature} className="list-disc">
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col justify-center">
            <ToggleSection
              label={"SIZE GUIDE"}
              isOpen={toggleSizeGuide}
              setIsOpen={setToggleSizeGuide}
            />
            <ToggleSection
              label={"HOW TO MEASURE"}
              isOpen={toggleMeasureGuide}
              setIsOpen={setToggleMeasureGuide}
            />
            <ToggleSection
              label={"CARE INSTRUCTIONS"}
              isOpen={toggleCareInstructions}
              setIsOpen={setToggleCareInstructions}
            />
          </div>
          {reviews?.length > 0 && <ProductReview reviews={reviews} />}
          {/* {children} */}
        </div>
      </div>
    </div>
  );
};

export default ProductView;
