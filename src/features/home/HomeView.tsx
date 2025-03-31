import React, { Fragment } from "react";
import Products from "../products/Products";
import Footer from "../footer/Footer";

const HomeView = () => {
  return (
    <div className="h-screen">
      <div className="w-full container max-w-[1280px] m-auto p-4 flex-1 flex mt-6 flex-col">
        <Products />
      </div>
      <Footer />
    </div>
  );
};

export default HomeView;
