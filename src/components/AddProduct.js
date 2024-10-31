import React, { useRef, useState } from "react";
import { toast } from "react-toastify";

const AddProduct = ({ isAddView, addProductToList }) => {
  const [isFormVisible, setIsFormVisible] = useState(true);
  const title = useRef(null);
  const subtitle = useRef(null);
  const description = useRef(null);
  const image = useRef(null);
  const price = useRef(null);
  const category = useRef(null);

  const handleClose = (e) => {
    e.preventDefault();
    setIsFormVisible(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newProduct = await addProductCall();
    if (newProduct) {
      addProductToList(newProduct);
      handleClose(e);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 10 * 1024 * 1024) {
      toast.error("File size exceeds 10 MB.");
      e.target.value = null;
    }
  };

  const addProductCall = async () => {
    const formData = new FormData();
    formData.append("file", image.current.files[0]);
    formData.append("title", title.current.value);
    formData.append("subtitle", subtitle.current.value);
    formData.append("description", description.current.value);

    const priceValue = parseFloat(price.current.value);

    if (isNaN(priceValue)) {
      toast.error("Price must be a valid number.");
      return;
    }
    formData.append("price", priceValue);

    formData.append("category", category.current.value);

    console.log(formData.get("title"));
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_KEY}/add/product`,
        {
          method: "POST",
          credentials: "include",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      toast.success(data.message);
      setTimeout(() => {
        window.location.reload();
      }, 3000);
      console.log(data);
      return data;
    } catch (error) {
      toast.error("Error: " + error.message);
    }
  };

  return (
    <div className="flex justify-center">
      {isFormVisible && isAddView && (
        <form
          className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-8 space-y-6 mb-10"
          onSubmit={handleSubmit}
        >
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-center text-gray-800">
              Add Product
            </h2>
            <button onClick={handleClose}>❌</button>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                className="border rounded-md px-4 py-2"
                type="text"
                ref={title}
                placeholder="Title"
                required
              />
              <input
                className="border rounded-md px-4 py-2"
                type="text"
                ref={subtitle}
                placeholder="SubTitle"
                required
              />
              <input
                className="border rounded-md px-4 py-2"
                type="number"
                ref={price}
                placeholder="Price"
                required
              />
            </div>
            <textarea
              className="border rounded-md px-4 py-2 w-full"
              ref={description}
              placeholder="Write about Product Description.."
              required
            />
            <input
              className="border rounded-md px-4 py-2 w-full"
              type="file"
              ref={image}
              accept="image/*"
              onChange={handleFileChange}
            />
            <div className="flex justify-center gap-5 mb-2">
              <label htmlFor="category" className="mr-2">
                Choose a category:
              </label>
              <select id="category" ref={category}>
                <option value="candles">Candles</option>
                <option value="sweets">Sweets</option>
              </select>
            </div>
          </div>
          <button
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
            type="submit"
          >
            ADD PRODUCT
          </button>
        </form>
      )}
    </div>
  );
};

export default AddProduct;
