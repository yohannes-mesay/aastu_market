import React, { useState } from "react";
import { useProduct } from "../Context/ProductContext";

const ServiceForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);
  const { uploadService } = useProduct();
  const [serviceData, setServiceData] = useState({
    title: "",
    description: "",
    type: "",
    image: null,
  });
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image" && files.length > 0) {
      setServiceData({ ...serviceData, image: files[0] });
    } else {
      setServiceData({ ...serviceData, [name]: value });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const uploaded = await uploadService(serviceData);
    const formData = new FormData();
    Object.entries(serviceData).forEach(([key, value]) => {
      formData.append(key, value);
    });
    console.log("formdta", formData);
    console.log("upd", uploaded);
    // setName("");
    // setDescription("");
    // setCategory("");
    // setImages([]);
  };

  return (
    <div>
      <h5 className="text-lg font-bold mb-6 text-left text-blue-900">
        Post a New Service
      </h5>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-black">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-gray-500  text-gray-700"
            value={serviceData.name}
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
            className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-gray-500  text-gray-700"
            rows="3"
            name="description"
            value={serviceData.description}
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
            className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-gray-500  text-gray-700"
            value={serviceData.type}
            name="type"
            onChange={handleChange}
            required
          >
            <option value="DL">Delivery</option>
            <option value="maintenance">Maintenance</option>
            <option value="repair">Repair</option>
            <option value="consulting">Consulting</option>
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
            name="image"
            className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-gray-500  text-gray-700"
            accept="image/*"
            multiple
            onChange={handleChange}
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
