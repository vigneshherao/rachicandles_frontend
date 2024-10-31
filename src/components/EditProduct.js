import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const EditProduct = ({ product, onClose, onUpdate }) => {
  const [isFormVisible, setIsFormVisible] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    price: "",
  });

  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title || "",
        subtitle: product.subtitle || "",
        description: product.description || "",
        price: product.price || "",
      });
    }
  }, [product]);

  const handleClose = (e) => {
    e.preventDefault();
    setIsFormVisible(false);
    if (onClose) onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedProduct = await editProductCall();
    if (updatedProduct) {
      onUpdate(updatedProduct);

      handleClose(e);
    }
  };

  const editProductCall = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/edit/product/${product._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      toast.success(data?.message);
      setTimeout(() => {
        window.location.reload();
      }, 3000);
      return data;
    } catch (error) {
      toast.success("Error!" + error.message);
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  return (
    <div className="flex justify-center">
      {isFormVisible && (
        <form
          className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-8 space-y-6 mb-10"
          onSubmit={handleSubmit}
        >
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-center text-gray-800">
              Edit Product
            </h2>
            <button onClick={handleClose}>❌</button>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                className="border rounded-md px-4 py-2"
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Title"
                required
              />
              <input
                className="border rounded-md px-4 py-2"
                type="text"
                name="subtitle"
                value={formData.subtitle}
                onChange={handleChange}
                placeholder="SubTitle"
                required
              />
              <input
                className="border rounded-md px-4 py-2"
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Price"
                required
              />
            </div>
            <textarea
              className="border rounded-md px-4 py-2 w-full"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Write about Product Description.."
              required
            />
          </div>
          <button
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
            type="submit"
          >
            UPDATE PRODUCT
          </button>
        </form>
      )}
    </div>
  );
};

export default EditProduct;
