import React, { useEffect, useState } from "react";
import Product from "./Product";

const Shop = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const fetchproductData = await fetch("http://localhost:5000/products");
    const productList = await fetchproductData.json();
    setProducts(productList?.data);
  };

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
      <div className="flex flex-wrap items-center justify-evenly">
        {products.map((product) => {
          return <Product key={product._id} product={product} />;
        })}
      </div>
    </div>
  );
};

export default Shop;
