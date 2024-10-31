import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Recomandtion from "./Recomandtion";

const ProductDetails = () => {
  const { ProductId } = useParams();
  const [product, setProduct] = useState({});
  const [selectedColors, setSelectedColors] = useState([]);

  useEffect(() => {
    fetchProductByID();
  }, [ProductId]);

  const fetchProductByID = async () => {
    const productDetails = await fetch(
      `${process.env.REACT_APP_API_KEY}/product/${ProductId}`
    );
    const product = await productDetails.json();
    setProduct(product?.data);
  };

  const { title, price, description, image, subtitle } = product;

  console.log(product);

  const handleColorChange = (color) => {
    setSelectedColors((prevColors) =>
      prevColors.includes(color)
        ? prevColors.filter((c) => c !== color)
        : [...prevColors, color]
    );
  };

  const handleBuyNow = () => {
    const phoneNumber = "8136941405";
    const colorsMessage =
      selectedColors.length > 0 ? `Color: ${selectedColors.join(", ")}\n` : "";

    const message = encodeURIComponent(
      `I am interested in the following product:\n\nTitle: ${title}\nPrice: Rs ${price}\nDescription: ${description}\n${colorsMessage}Link: http://localhost:3000/Product/${ProductId}`
    );
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className={!image?.url ? "h-screen" : "h-auto"}>
      <div className="mt-10 sm:m-20 flex flex-col lg:flex-row gap-14 sm:px-28 sm:mb-0 pb-16">
        <div className="lg:w-1/2 flex flex-col items-center gap-6">
          {image?.url ? (
            <img
              src={image.url}
              alt="Product"
              className="w-full h-auto aspect-square object-cover rounded-sm"
            />
          ) : (
            <div className="h-64 w-full flex items-center justify-center bg-gray-200 rounded-sm">
              <span className="text-gray-500">Image not available</span>
            </div>
          )}
        </div>
        <div className="lg:w-1/2 flex flex-col gap-4 p-4 lg:p-2 bg-white relative">
          <h1 className="text-3xl font-bold mt-2">{title}</h1>
          <h3 className="text-gray-400 font-bold mt-2">{subtitle}</h3>
          <div className="flex justify-start items-center text-center">
            <h6 className="text-2xl font-semibold line-through mt-4 mr-2 text-gray-500">
              Rs {price + 50}
            </h6>
            <h6 className="text-3xl font-semibold mt-4 text-red-700">
              Rs {price}
            </h6>
          </div>
          <p className="text-gray-700 font-light mt-2">{description}</p>
          <div>
            <h3 className="font-semibold">Colors:</h3>
            <ul className="flex flex-wrap gap-4 mt-2">
              {["red", "green", "white", "yellow", "pink", "orange"].map(
                (color) => (
                  <li key={color} className="flex items-center">
                    <input
                      className="mr-2"
                      type="checkbox"
                      id={color}
                      name={color}
                      value={color}
                      onChange={() => handleColorChange(color)}
                    />
                    <label htmlFor={color} className="text-lg capitalize">
                      {color}
                    </label>
                  </li>
                )
              )}
            </ul>
          </div>
          <div className="flex flex-col lg:flex-row items-center gap-5 mt-4">
            <button
              className="bg-red-700 text-white font-semibold py-3 px-16 w-full lg:w-auto"
              onClick={handleBuyNow}
            >
              Buy Now!
            </button>
          </div>
          <p className="p-5 bg-blue-50 rounded-md text-gray-800">
            Candles have been cherished for centuries, serving both practical
            and aesthetic purposes. Traditionally, they provide light and
            warmth.
          </p>
        </div>
      </div>
      <Recomandtion productId={ProductId} />
    </div>
  );
};

export default ProductDetails;
