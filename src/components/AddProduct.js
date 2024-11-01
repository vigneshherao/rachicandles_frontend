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

  const productValidate = (formData, toast) => {
    const title = formData.get("title");
    const subtitle = formData.get("subtitle");
    const price = formData.get("price");
    const description = formData.get("description");

    if (!title || title.trim().length === 0 || title.length < 5) {
      toast.error("Title should be a valid string with at least 5 characters.");
      throw new Error("Validation error: Title is invalid.");
    }

    if (!subtitle || subtitle.trim().length === 0 || subtitle.length < 5) {
      toast.error(
        "Subtitle should be a valid string with at least 5 characters."
      );
      throw new Error("Validation error: Subtitle is invalid.");
    }

    if (
      !description ||
      description.trim().length === 0 ||
      description.length < 20
    ) {
      toast.error(
        "Description should be a valid string with at least 20 characters."
      );
      throw new Error("Validation error: Description is invalid.");
    }

    if (!price || isNaN(price)) {
      toast.error("Price should be a valid number.");
      throw new Error("Validation error: Price is invalid.");
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

    try {
      productValidate(formData, toast);
      const response = await fetch(
        `${process.env.REACT_APP_API_KEY}/add/product`,
        {
          method: "POST",
          credentials: "include",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);
        toast.error(errorData.error || "Please check the form");
        throw new Error("Error while adding product");
      }

      const data = await response.json();
      toast.success(data.message);
      setTimeout(() => {
        window.location.reload();
      }, 3000);
      console.log(data);
      return data;
    } catch (error) {
      console.error("There was a problem with the add operation:", error);
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
