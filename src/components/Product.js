import React from "react";

const Product = ({ product }) => {
  const { title, subtitle, price, image } = product;
  return (
    <div className="my-3 mx-0 md:m-3 p-4 w-full sm:w-1/2 md:w-[425px] border border-gray-300 bg-[#f3e7d9]  rounded-lg transform transition-transform hover:scale-105 ">
      <div className="relative h-[300px w-[300px] md:h-[391px] md:w-[391px]">
        <img
          className="w-full h-full object-cover rounded-t-lg"
          src={image.url ? image.url : image}
          alt="product"
        />
        <span className="absolute top-2 left-2 bg-white text-black text-xs font-semibold px-2 py-1 rounded">
          Sale
        </span>
      </div>
      <div className="p-4 text-center">
        <h3 className="font-semibold text-lg text-gray-800">{title}</h3>
        <p className="text-gray-500 text-sm mt-1">{subtitle}</p>
        <div className="flex justify-center items-baseline mt-2 space-x-2">
          <span className="text-gray-400 line-through text-sm">
            Rs. {price + 50}
          </span>
          <span className="text-red-600 font-semibold text-lg">
            Rs. {price}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Product;
