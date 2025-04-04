"use client";
import Link from "next/link";
import React, { useState } from "react";
import { FaRegUser } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import { BiShoppingBag } from "react-icons/bi";
import data from "@/data/products.json";
import { IoIosArrowDown } from "react-icons/io";
import { useRouter } from "next/navigation";
import products from "@/data/products.json";
import { Products, ProductT } from "@/_types/products";
const Navbar = () => {
  const router = useRouter();
  const item = 2;
  let categories = [
    ...new Set(Object.values(data.map((product) => product.category))),
  ];

  const [productsHover, setProductsHover] = useState(false);
  interface Cart {
    id: string;
    quantity: number;
  }
  const defaultCart = [
    {
      id: "1",
      quantity: 1,
    },
    {
      id: "2",
      quantity: 1,
    },
    {
      id: "3",
      quantity: 1,
    },
  ];
  const [cart, setCart] = useState<Cart[]>(defaultCart);

  return (
    <div className="h-40 border flex justify-between place-items-center p-8 bg-black sticky top-0 z-100">
      <div className="flex gap-8">
        <span className="border border-white w-30 text-white">
          <Link href={"/"}>LOGO</Link>
        </span>
        <ul className="hidden lg:flex gap-4 font-medium text-white tracking-widest">
          <li
            className="flex gap-2 py-2 place-items-center relative flex-col group"
            onMouseEnter={() => setProductsHover(true)}
            onMouseLeave={() => setProductsHover(false)}
          >
            <span className="flex gap-2 place-items-center">
              <Link href={"/collections"}>PRODUCTS</Link>
              <IoIosArrowDown size={"1rem"} />
            </span>

            {productsHover && (
              <div className="flex flex-col gap-4 absolute top-10 bg-white text-black p-4">
                {categories.map((category) => (
                  <button
                    onClick={() => {
                      router.push(`/collections/?categories=${category}`);
                    }}
                    className="border-b-2 border-transparent hover:border-b-primary-red transition-colors ease-in-out "
                    // href={`/collections/${category}`}
                    key={category}
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
          </li>
          <li className="py-2">
            <Link href={"/pages/retailers"}>RETAILERS</Link>
          </li>
          <li className="py-2">
            <Link href={"/pages/contact"}>CONTACT</Link>
          </li>
        </ul>
      </div>

      <div className="flex gap-8">
        <FaRegUser size={"1.5rem"} color="white" className="cursor-pointer" />
        <IoIosSearch
          size={"1.75rem"}
          color="white"
          className="cursor-pointer"
        />
        <div className="relative">
          {cart.length > 0 && (
            <span className="absolute -bottom-[.5px] -right-[1.5px] w-4 h-4 rounded-full bg-primary-red border-white border-2"></span>
          )}
          <BiShoppingBag
            size={"1.75rem"}
            color="white"
            className="cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
