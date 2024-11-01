import React, { useEffect, useState } from "react";
import Product from "./Product";
import { Link } from "react-router-dom";
import Shimmer from "./Shimmer";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");

  useEffect(() => {
    fetchProducts();
  }, [category]);

  const fetchProducts = async () => {
    const fetchproductData = await fetch(
      `${process.env.REACT_APP_API_KEY}/products/${category}`
    );
    const productList = await fetchproductData.json();
    setProducts(productList?.data);
  };

  if (!products || products.length === 0) {
    return <Shimmer number={9} />;
  }

  return (
    <div className="py-8 px-5 md:px-20 min-h-screen">
      <div className="text-center mb-5">
        <h1 className="text-xl md:text-4xl text-gray-700 font-semibold">
          10% Off! On Every Products
        </h1>
        <p className="mt-2 text-gray-600">
          Discover our exclusive range of handcrafted candles for every
          occasion.
        </p>
      </div>
      <div className="flex justify-center gap-5 mb-2">
        <button
          className="border border-black py-1 px-5"
          onClick={() => setCategory("candles")}
        >
          Candles
        </button>
        <button
          className="border border-black py-1 px-5"
          onClick={() => setCategory("sweets")}
        >
          Sweet
        </button>
      </div>

      <div className="flex flex-wrap items-center justify-evenly">
        {products.map((product) => {
          return (
            <Link to={`/Product/${product._id}`} key={product._id}>
              <Product product={product} />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Shop;
