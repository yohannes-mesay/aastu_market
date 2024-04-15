import React, { useState } from "react";
import { useProduct } from "../Context/ProductContext";

const PostForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [images, setImages] = useState(null);
  const { uploadProduct } = useProduct();
  const [productData, setProductData] = useState({
    title: "",
    description: "",
    price: 0,
    type: "",
    image: null,
  });
  console.log("price", productData.price);
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image" && files.length > 0) {
      setProductData({ ...productData, image: files[0] });
    } else {
      setProductData({ ...productData, [name]: value });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const uploaded = await uploadProduct(productData);
    const formData = new FormData();
    Object.entries(productData).forEach(([key, value]) => {
      formData.append(key, value);
    });
    console.log("formdta", formData);
    console.log("upd", uploaded);
    // setName("");
    // setDescription("");
    // setPrice(0);
    // setCategory("FD");
    // setImages([]);
  };

  return (
    <div>
      <h5 className="text-lg font-bold mb-6 text-left text-blue-900">
        Post a New Product
      </h5>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-black">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="title"
            className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-gray-400  text-gray-700"
            value={productData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-black">
            Description:
          </label>
          <textarea
            id="description"
            className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-gray-400  text-gray-700"
            rows="3"
            name="description"
            value={productData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="price" className="block text-black">
            Price:
          </label>
          <input
            type="number"
            id="price"
            name="price"
            className="border  border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-gray-400  text-gray-700 "
            value={productData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="category" className="block text-black">
            Category:
          </label>
          <select
            id="category"
            name="type"
            className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-gray-400  text-gray-700"
            value={productData.type}
            onChange={handleChange}
            required
          >
            <option value="All">All</option>
            <option value="FD">Food</option>
            <option value="ST">Stationery</option>
            <option value="PC">Personal Computer</option>
            <option value="MB">Mobile</option>
            <option value="SK">Sticker</option>
            <option value="CL">Bag</option>
            <option value="CL">Clothes</option>
            <option value="PC">Other Electronics</option>
          </select>
        </div>
        <div>
          <label htmlFor="images" className="block text-black">
            Upload Image:
          </label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-gray-400  text-gray-700 "
            accept="image/*"
          />
        </div>
        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-blue-900 text-white py-2 px-4 rounded hover:bg-blue-800"
          >
            Submit
          </button>
          <button
            type="button"
            className="text-gray-700 bg-gray-300 py-2 px-4 rounded hover:bg-gray-400"
            onClick={() => {
              setName("");
              setDescription("");
              setPrice(0);
              setCategory("");
              setImages([]);
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
