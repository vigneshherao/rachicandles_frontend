import React from "react";
import { Link } from "react-router-dom";

const Category = () => {
  return (
    <>
      <div className="text-center mb-5 mt-5">
        <h1 className="text-xl md:text-4xl text-gray-700 font-semibold">
          Diwali, Christmas & New Year Candles Are Here!
        </h1>
        <p className="mt-2 text-gray-600">
          Discover our exclusive range of handcrafted candles for every
          occasion.
        </p>
      </div>
      <div className="flex justify-center mb-5 md:mb-16">
        <Link to={"/Shop"}>
          <div className="m-3 p-4 w-full sm:w-1/2 md:w-[425px] border border-gray-300 bg-[#f3e7d9]  rounded-lg transform transition-transform hover:scale-105 ">
            <div className="relative">
              <img
                className="w-full object-cover rounded-t-lg"
                src="https://m.media-amazon.com/images/I/71umCKnKw3L._AC_UF894,1000_QL80_.jpg"
                alt="product"
              />
              <span className="absolute top-2 left-2 bg-white text-black text-xs font-semibold px-2 py-1 rounded">
                CANDLES
              </span>
            </div>
          </div>
        </Link>
        <Link to={"/Shop"}>
          <div className="m-3 p-4 w-full sm:w-1/2 md:w-[425px] border border-gray-300 bg-[#f3e7d9]  rounded-lg transform transition-transform hover:scale-105 ">
            <div className="relative">
              <img
                className="w-full object-cover rounded-t-lg"
                src="https://www.distacart.com/cdn/shop/products/sOpnT0cv7e_1280x.jpg?v=1704721454"
                alt="product"
              />
              <span className="absolute top-2 left-2 bg-white text-black text-xs font-semibold px-2 py-1 rounded">
                SWEETS
              </span>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default Category;
