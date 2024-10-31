import React, { useEffect, useState } from "react";
import Product from "./Product";
import { Link } from "react-router-dom";
import Category from "./Category";

const HomePage = () => {
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
      <Category />
      <div className="text-center mb-5">
        <h1 className="text-xl md:text-4xl text-gray-700 font-semibold">
          Featured Products
        </h1>
      </div>
      <div className="flex flex-wrap items-center justify-evenly">
        {products.slice(1, 10).map((product) => {
          return (
            <Link to={`/Product/${product._id}`} key={product._id}>
              <Product product={product} />
            </Link>
          );
        })}
      </div>
      <div className="flex justify-center m-5  md:m-10 ">
        <button className="hover:text-red-500">
          <Link to={"/Shop"}>View All</Link>
        </button>
      </div>
    </div>
  );
};

export default HomePage;
