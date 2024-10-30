import React, { useState, useEffect } from "react";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";

const AdminPanel = () => {
  const [products, setProducts] = useState([]);
  const [isAddView, setIsAddView] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const addProductToList = (newProduct) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:5000/products");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const productList = await response.json();
      setProducts(productList?.data || []);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDelete = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/delete/product/${productId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== productId)
      );
    } catch (error) {
      setError(error.message);
      console.error("Error deleting product:", error);
    }
  };

  const handleEdit = (product) => {
    setCurrentProduct(product);
  };

  const handleUpdate = (updatedProduct) => {
    console.log("Updating product:", updatedProduct); // Log to confirm update
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product._id === updatedProduct._id ? updatedProduct : product
      )
    );
  };

  return (
    <div className="h-full md:h-full p-4 md:px-20">
      {error && <div className="text-red-500">{error}</div>}
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
      <AddProduct isAddView={isAddView} addProductToList={addProductToList} />
      {currentProduct && (
        <EditProduct
          product={currentProduct}
          onClose={() => setCurrentProduct(null)}
          onUpdate={handleUpdate}
        />
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.length === 0 ? (
          <p className="col-span-full text-center">No products available.</p>
        ) : (
          products.map((product) => (
            <div
              className="flex flex-wrap justify-between items-center border border-gray-500 p-4 rounded shadow-lg mb-4"
              key={product._id}
            >
              <div className="flex flex-col flex-grow">
                <h2 className="text-sm mb-2">{product.title}</h2>
                <img
                  className="w-20 h-20 object-cover mb-2"
                  src={product?.image}
                  alt={product.title}
                />
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
          ))
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
