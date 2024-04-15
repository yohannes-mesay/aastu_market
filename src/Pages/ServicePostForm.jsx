import React, { useState } from "react";
import { useProduct } from "../Context/ProductContext";

const ServiceForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);
  const [nameError, setNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [serviceData, setServiceData] = useState({
    title: "devCrew",
    description: "devCrew delivery",
    type: "DL",
    image: null,
  });
  const { uploadProduct } = useProduct();
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setImages(imageUrls);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // console.log("Form submitted:", { name, description, category, images });
    uploadProduct(serviceData);
    setName("");
    setDescription("");
    setCategory("");
    setImages([]);
  };
  const handleNameChange = (e) => {
    const inputValue = e.target.value;
    if (!isNaN(inputValue)) {
      setName("");
      setNameError("Name cannot be a number");
    } else {
      setName(inputValue);
      setNameError("");
    }
  };

  const MAX_DESCRIPTION_LENGTH = 200;
  const handleDescriptionChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue.length <= MAX_DESCRIPTION_LENGTH) {
      setDescription(inputValue);
      setDescriptionError("");
    } else {
      setDescriptionError(`Description must be ${MAX_DESCRIPTION_LENGTH} characters or less`);
    }
  };

  return (
    <div>
      <h5 className="text-lg font-bold mb-6 text-left text-blue-900">
        Post a New Service
      </h5>
      <form onSubmit={handleSubmit} className="space-y-4">
      <div>
          <label htmlFor="name" className="block text-black">
            Name:
          </label>
          <input
            type="text"
            id="name"
            className={`border ${nameError ? 'border-red-500' : 'border-gray-300'} rounded-md px-4 py-2 w-full focus:outline-none focus:border-gray-500  text-gray-700`}
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
            className={`border ${descriptionError ? 'border-red-500' : 'border-gray-300'} rounded-md px-4 py-2 w-full focus:outline-none focus:border-gray-500  text-gray-700`}
            rows="3"
            value={description}
            onChange={handleDescriptionChange}
            required
          />
          {descriptionError && <p className="text-red-500">{descriptionError}</p>}
        </div>
        <div>
          <label htmlFor="category" className="block text-black">
            Category:
          </label>
          <select
            id="category"
            className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-gray-500  text-gray-700"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="DL">Delivery</option>
            <option value="repair">Repair Electronics</option>
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
            className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-gray-500  text-gray-700"
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
            className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400"
            onClick={() => {
              setName("");
              setDescription("");
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

export default ServiceForm;
