"use client";
import React, { useEffect, useState } from "react";
import products from "@/data/products.json";
import { Products, ProductT } from "@/_types/products";
import Image from "next/image";
import Link from "next/link";
const page = () => {
  interface Cart {
    id: string;
    quantity: number;
    size?: string;
  }
  const defaultCart = [
    {
      id: "1",
      quantity: 1,
    },
    {
      id: "2",
      quantity: 1,
      size: "m",
    },
    {
      id: "3",
      quantity: 1,
      size: "lg",
    },
  ];
  const [cart, setCart] = useState<Products | any>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    if (defaultCart.length === 0) return;
    const cartItems = defaultCart.map((cart) => {
      const item = products.find((product) => product.id === cart.id);
      return { ...item, quantity: cart.quantity, size: cart.size };
    });
    console.log(cartItems);
    setCart(cartItems);
    setLoading(false);
  }, []);

  const subtractQuantity = (id: number) => {
    const removeItem = cart.find((product) => product.id === id);
    if (removeItem.quantity > 1) {
      setCart((prev) =>
        prev.map((product) =>
          product.id === id
            ? { ...product, quantity: product.quantity - 1 }
            : product
        )
      );
    } else {
      setCart((prev) => prev.filter((product) => product.id !== id));
    }
  };
  const addQuantity = (id: number) => {
    const productToUpdate = cart.map((product) =>
      product.id === id
        ? { ...product, quantity: product.quantity + 1 }
        : product
    );
    setCart(productToUpdate);
  };

  return (
    <div className="flex flex-col gap-4 w-full  max-w-[1280px] m-auto p-4 flex-1">
      <div className="text-center">
        <h1 className="text-5xl">CART</h1>
        <Link href={"/collections"} className="underline">
          Continue shopping
        </Link>
      </div>
      {cart.length > 0 && (
        <div className="flex flex-col gap-2">
          {cart.map((item) => (
            <div key={item.id} className="flex gap-4 place-items-start">
              <div>
                <Image
                  src={item.images[0]}
                  width={80}
                  height={40}
                  alt={item.images[0]}
                  sizes="100vw"
                />
              </div>
              <div className="flex flex-col gap-2">
                <span className="">{item.name}</span>
                <span className=" text-neutral-400">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
                {item?.size && (
                  <span className="font-medium text-neutral-400">
                    Size: {item.size.toUpperCase()}
                  </span>
                )}
                <div className="flex gap-4 place-items-center">
                  <div className="block border border-neutral-300 p-2 gap-4">
                    <button
                      className="cursor-pointer w-5"
                      onClick={() => subtractQuantity(item.id)}
                    >
                      -
                    </button>
                    <span className="w-10 text-center inline-block">
                      {item.quantity}
                    </span>
                    <button
                      className="cursor-pointer w-5"
                      onClick={() => addQuantity(item.id)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    className="underline"
                    onClick={() =>
                      setCart((prev) =>
                        prev.filter((product) => product.id !== item.id)
                      )
                    }
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default page;
