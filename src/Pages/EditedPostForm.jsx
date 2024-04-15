import React, { useState } from "react";
import { useProduct } from "../Context/ProductContext";


const PostForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  
  const [price, setPrice] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);
  const [nameError, setNameError] = useState('');
  const { uploadProduct } = useProduct();
  const [priceError, setPriceError] = useState('');
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setImages(imageUrls);
  };
  const [productData, setProductData] = useState({
    title: "pc",
    description: "pc pc pc",
    price: 25000,
    type: 'FD',
    image: null
  })

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Form submitted:", {
      name,
      description,
      price,
      category,
      images,
    });
    uploadProduct(productData);
    setName("");
    setDescription("");
    setPrice(0);
    setCategory("FD");
    setImages([]);
  };
  const handlePriceChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue === '' || (!isNaN(inputValue) && parseFloat(inputValue) > 0)) {
      setPrice(inputValue);
      setPriceError('');
    } else {
      setPriceError('Price must be a number greater than 0');
    }
  };
  const handleNameChange = (e) => {
    const inputValue = e.target.value;
    if (!isNaN(inputValue)) {
      setName('');
      setNameError('Name cannot be a number');
    } else {
      setName(inputValue);
      setNameError('');
    }
  };
  const MAX_DESCRIPTION_LENGTH = 200; // Define your maximum character limit

const handleDescriptionChange = (e) => {
  const inputValue = e.target.value;
  if (inputValue.length <= MAX_DESCRIPTION_LENGTH) {
    setDescription(inputValue);
    setDescriptionError('');
  } else {
    setDescriptionError(`Description must be ${MAX_DESCRIPTION_LENGTH} characters or less`);
  }
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
    className={`border ${nameError ? 'border-red-500' : 'border-gray-300'} rounded-md px-4 py-2 w-full focus:outline-none focus:border-gray-400  text-gray-700`}
    value={name}
    onChange={handleNameChange}
    required
  />
  {nameError && <p className="text-red-500">{nameError}</p>}
</div>
<div>
  <label htmlFor="description" className="block text-black">
    Description:
  </label>
  <textarea
    id="description"
    className={`border ${descriptionError ? 'border-red-500' : 'border-gray-300'} rounded-md px-4 py-2 w-full focus:outline-none focus:border-gray-400  text-gray-700`}
    rows="3"
    value={description}
    onChange={handleDescriptionChange}
    required
  />
  {descriptionError && <p className="text-red-500">{descriptionError}</p>}
</div>

        <div>
  <label htmlFor="price" className="block text-black">
    Price:
  </label>
  <input
    type="text"
    id="price"
    className={`border ${priceError ? 'border-red-500' : 'border-gray-300'} rounded-md px-4 py-2 w-full focus:outline-none focus:border-gray-400 text-gray-700`}
    value={price}
    onChange={handlePriceChange}
    required
  />
  {priceError && <p className="text-red-500">{priceError}</p>}
</div>
        <div>
          <label htmlFor="category" className="block text-black">
            Category:
          </label>
          <select
            id="category"
            className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-gray-400  text-gray-700"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="pc">Personal Computer</option>
            <option value="electronics">Phone</option>
            <option value="clothes">Clothes</option>
            <option value="FD">Food</option>
            <option value="stationary">Stationary</option>
            <option value="bag">Bag</option>
            <option value="sticker">Sticker</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="images" className="block text-black">
            Upload Image:
          </label>
          <input
            type="file"
            id="images"
            className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-gray-400  text-gray-700 "
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            required
          />
          <div className="mt-2 flex space-x-4">
            {images.map((imageUrl, index) => (
              <img
                key={index}
                src={imageUrl}
                alt={`Image ${index + 1}`}
                className="w-20 h-20 object-cover rounded-md"
              />
            ))}
          </div>
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
