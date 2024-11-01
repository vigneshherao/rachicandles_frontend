import React from "react";

const ShimmerUi = () => {
  return (
    <div className="my-3 mx-0 md:m-3 p-4 w-full sm:w-1/2 md:w-[425px] border border-gray-500 bg-[#f3e7d9] rounded-lg">
      <div className="relative h-[300px] w-[300px] md:h-[391px] md:w-[391px] bg-[#d0c5b9] animate-pulse"></div>
      <div className="p-4 text-center">
        <div className="bg-[#d0c5b9]  animate-pulse h-6 w-1/2 mx-auto mb-2 rounded"></div>
        <div className="bg-[#d0c5b9] animate-pulse h-4 w-1/3 mx-auto mb-4 rounded"></div>
        <div className="flex justify-center items-baseline mt-2 space-x-2">
          <div className="bg-[#d0c5b9]  animate-pulse h-4 w-1/4 rounded"></div>
          <div className="bg-[#d0c5b9]  animate-pulse h-6 w-1/4 rounded"></div>
        </div>
      </div>
    </div>
  );
};

const Shimmer = ({ number }) => {
  return (
    <div className="flex flex-wrap justify-center mt-10 p-4">
      {Array.from({ length: number }).map((_, index) => (
        <ShimmerUi key={index} />
      ))}
    </div>
  );
};

export default Shimmer;
