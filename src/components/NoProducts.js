import React from "react";
import noDataImg from "../assets/Nodata.png";

const NoProducts = () => {
  return (
    <div className="flex flex-col justify-start items-center h-screen md:mt-10">
      <p className="text-center">No products available.</p>
      <img
        src={noDataImg}
        alt="No data available"
        className="mt-4 h-[400px] "
      />
      <h2 className="text-center font-semibold text-green-800">
        Add your First Product!
      </h2>
    </div>
  );
};

export default NoProducts;
