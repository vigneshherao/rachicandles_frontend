import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Product from "./Product";

const Recomandtion = () => {
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
    <div className="px-5 md:px-20 mt-10">
      <h1 className="text-xl md:text-4xl text-gray-700 font-semibold">
        Similar Products
      </h1>
      <div className="flex flex-wrap items-center justify-evenly">
        {products.slice(1, 4).map((product) => {
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

export default Recomandtion;
