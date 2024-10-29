import React from "react";
import { CiDeliveryTruck } from "react-icons/ci";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { IoLeafOutline } from "react-icons/io5";

const About = () => {
  return (
    <div className="text-center h-full md:h-screen mt-10 md:mt-20 px-5 md:px-20">
      <div className="text-center mb-5">
        <h1 className="text-xl md:text-4xl text-black font-semibold">
          RACHI CANDLES!
        </h1>
        <p className="mt-2 text-gray-600">
          Luminous Dreams: A Candle Factory Story
        </p>
      </div>
      <div className="mt-2 md:mt-10">
        <p className="text-md md:text-lg text-gray-800 leading-relaxed">
          In the serene state of Karnataka, where tradition meets modernity, a
          young girl named Aditi embarked on a journey that would light up her
          dreams. Inspired by the vibrant festivals celebrated in her hometown,
          Aditi saw an opportunity to create something special: handcrafted
          candles that would bring warmth and joy to every home. With a small
          savings account and an unwavering spirit, she set out to start her own
          candle factory, aptly named "Aditi's Luminaries." The factory began in
          her modest garage, where she experimented with different waxes, wicks,
          and fragrances. Her passion for art and design transformed simple
          materials into exquisite candles, each reflecting her love for nature
          and the rich culture of Karnataka. Aditi's candles quickly became
          known for their unique shapes and enchanting scents inspired by local
          flora—like jasmine, sandalwood, and marigold. As word spread, orders
          began to flow in from friends, family, and local shops. Aditi's dream
          was turning into a reality. Emphasizing sustainability, Aditi sourced
          eco-friendly materials and employed local artisans to help with
          production, creating jobs in her community. Each candle became a
          story—a symbol of warmth, hope, and the magic of handmade
          craftsmanship. Today, Aditi's Luminaries stands as a testament to her
          determination and creativity, illuminating homes across Karnataka and
          beyond. Aditi's journey reminds us that with passion and perseverance,
          even the smallest of dreams can shine brightly.
        </p>
      </div>
      <div className="flex flex-wrap justify-center mt-10 md:mt-12">
        <div className="w-full md:w-1/4 h-24 text-center border border-gray-500 text-black m-2 rounded-lg shadow-lg transition-transform transform hover:scale-105">
          <div className="flex items-center justify-center h-full">
            <VscWorkspaceTrusted />
            <p className="text-lg font-semibold ml-2">100% Trustable</p>
          </div>
        </div>
        <div className="w-full md:w-1/4 h-24 text-center border border-gray-500 text-black m-2 rounded-lg shadow-lg transition-transform transform hover:scale-105">
          <div className="flex items-center justify-center h-full">
            <IoLeafOutline />
            <p className="text-lg font-semibold ml-2">Eco Friendly</p>
          </div>
        </div>
        <div className="w-full md:w-1/4 h-24 text-center border border-gray-500 text-black m-2 rounded-lg shadow-lg transition-transform transform hover:scale-105">
          <div className="flex items-center justify-center h-full">
            <CiDeliveryTruck />
            <p className="text-lg font-semibold ml-2">All India Delivery</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
