import React, { useState, useEffect } from "react";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NoProducts from "./NoProducts";
import { useDispatch, useSelector } from "react-redux";
import { addProducts } from "../utils/productSlice";

const AdminPanel = () => {
  const dispatch = useDispatch();
  const products = useSelector((store) => store?.products?.productsList);
  const [isAddView, setIsAddView] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  useEffect(() => {
    if (!products || products.length === 0) {
      fetchProducts();
    }
  }, [products]);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_KEY}/products`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const productList = await response.json();
      dispatch(addProducts(productList?.data));
    } catch (error) {
      toast.error("Error fetching products: " + error.message);
      console.error("Error fetching products:", error);
    }
  };

  const handleDelete = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_KEY}/delete/product/${productId}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      toast.success(data?.message);
      fetchProducts();
    } catch (error) {
      toast.error("Error deleting product: " + error.message);
      console.error("Error deleting product:", error);
    }
  };

  const handleEdit = (product) => {
    setCurrentProduct(product);
  };

  const handleUpdate = (updatedProduct) => {
    fetchProducts();
  };

  return (
    <div className="h-full md:h-full p-4 md:px-20">
      <div className="flex flex-wrap justify-between mt-10 mb-10 md:mb-20">
        <div className="border border-gray-500 w-full md:w-[40%] flex justify-between px-10 py-4 rounded mb-4 md:mb-0">
          <h2 className="font-bold">Products Added</h2>
          <p className="font-semibold">{products.length}</p>
        </div>
        <div className="w-full md:w-[40%] flex justify-end px-10 py-4">
          <button
            onClick={() => setIsAddView(!isAddView)}
            className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 transition"
          >
            Add Product
          </button>
        </div>
      </div>
      <AddProduct isAddView={isAddView} />
      {currentProduct && (
        <EditProduct
          product={currentProduct}
          onClose={() => setCurrentProduct(null)}
          onUpdate={handleUpdate}
        />
      )}
      {products.length === 0 ? (
        <NoProducts />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <div
              className="flex flex-wrap justify-between items-center border border-gray-500 p-4 rounded shadow-lg mb-4"
              key={product._id}
            >
              <div className="flex flex-col flex-grow">
                <h2 className="text-sm mb-2">{product.title}</h2>
                {product.image?.url ? (
                  <img
                    src={product.image?.url}
                    alt="Product"
                    className="w-20 h-20 object-cover mb-2"
                  />
                ) : (
                  <div className="w-20 h-20 mb-2">
                    <span className="text-gray-500">Image not available</span>
                  </div>
                )}
                <p className="text-gray-700">Price: ${product.price}</p>
              </div>
              <div className="flex flex-col space-y-2 items-end">
                <button
                  className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 transition"
                  onClick={() => handleEdit(product)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition"
                  onClick={() => handleDelete(product._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
