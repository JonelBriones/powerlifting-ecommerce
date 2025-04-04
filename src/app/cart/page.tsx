"use client";
import React, { useEffect, useState } from "react";
import products from "@/data/products.json";
import { Products, ProductT } from "@/_types/products";
import Image from "next/image";
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

  return (
    <div>
      <h1 className="text-2xl">CART</h1>
      <span>Continue shopping</span>
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
              <div className="flex flex-col">
                <span>{item.name}</span>
                <span>
                  {item?.size && (
                    <>
                      <span className="font-medium">Size: </span>
                      {item.size.toUpperCase()}
                    </>
                  )}
                </span>
                <span>${item.price * item.quantity}</span>
                <div className="flex justify-between border p-2 w-30">
                  <button className="cursor-pointer">-</button>
                  <span>{item.quantity}</span>
                  <button className="cursor-pointer">+</button>
                </div>
                <span>Remove</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default page;
