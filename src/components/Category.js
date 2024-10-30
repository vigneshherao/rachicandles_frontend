import React from "react";

const Category = () => {
  return (
    <div className="flex justify-center mb-5 md:mb-16">
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
    </div>
  );
};

export default Category;
