import React, { useEffect, useState } from "react";
import Product from "./Product";
import { Link } from "react-router-dom";
import Category from "./Category";
import Shimmer from "./Shimmer";
import { useDispatch, useSelector } from "react-redux";
import { addProducts } from "../utils/productSlice";

const HomePage = () => {
  const dispatch = useDispatch();
  const products = useSelector((store) => store?.products?.productsList);

  useEffect(() => {
    if (!products || products.length === 0) {
      fetchProducts();
    }
  }, [products]);

  const fetchProducts = async () => {
    const fetchproductData = await fetch(
      `${process.env.REACT_APP_API_KEY}/products`
    );
    const productList = await fetchproductData.json();
    dispatch(addProducts(productList?.data));
  };

  if (!products || products.length === 0) {
    return <Shimmer number={9} />;
  }

  return (
    <div className="py-8 px-2 md:px-20 min-h-screen">
      <Category />
      <div className="text-center mb-5">
        <h1 className="text-xl md:text-4xl text-gray-700 font-semibold italic">
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
