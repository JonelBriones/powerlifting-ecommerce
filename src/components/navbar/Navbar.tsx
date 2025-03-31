"use client";
import Link from "next/link";
import React from "react";
import { FaRegUser } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import { IoCart } from "react-icons/io5";

const Navbar = () => {
  const links = [
    "products",
    "collections",
    "gift cards",
    "retailers",
    "contact",
  ];
  return (
    <div className="h-40 border flex justify-between place-items-center p-8 bg-black">
      <div className="flex gap-8">
        <span className="border border-white w-30 text-white">LOGO</span>
        <ul className="flex gap-4">
          {links.map((link) => (
            <li key={link} className="font-medium text-white tracking-widest">
              <Link href={"/"}>{link.toUpperCase()}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex gap-8">
        <FaRegUser size={"1.25rem"} color="white" className="cursor-pointer" />
        <IoIosSearch size={"1.5rem"} color="white" className="cursor-pointer" />
        <IoCart size={"1.5rem"} color="white" className="cursor-pointer" />
      </div>
    </div>
  );
};

export default Navbar;
