import React, { useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { useProduct } from "../Context/ProductContext";

const EventForm = () => {
  const [name, setName] = useState("new");
  const [description, setDescription] = useState("new");
  const [date, setDate] = useState("new");
  const [time, setTime] = useState("new");
  const [location, setLocation] = useState("new");
  const [host, setHost] = useState("new");
  const [images, setImages] = useState([]);
  const [nameError, setNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [eventData, setEventData] = useState({
    title: "new",
    organizer: "devcrew",
    description: "hackathon",
    event_date: "2024-04-20",
    event_time: "11:00:00",
    event_place: "lt",
    image: null,
  });
  const {uploadProduct} =useProduct();
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setImages(imageUrls);
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

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Form submitted:", {
      name,
      description,
      date,
      time,
      location,
      host,
      images,
    });
    uploadProduct(eventData);
    // setName("");
    // setDescription("");
    // setDate("");
    // setTime("");
    // setLocation("");
    // setHost("");
    // setImages([]);
  };

  return (
    <div>
      <h5 className="text-lg font-bold mb-6 text-left text-blue-900">
        Post a New Event
      </h5>
      <form onSubmit={handleSubmit} className="space-y-4">
      <div>
          <label htmlFor="name" className="block text-gray-700">
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
          <label htmlFor="description" className="block text-gray-700">
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
          <label htmlFor="date" className="block text-gray-700">
            Date:
          </label>
          <input
            type="date"
            id="date"
            className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-gray-400  text-gray-700"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="time" className="block text-gray-700">
            {" "}
            Time:
          </label>
          <input
            type="time"
            id="time"
            className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-gray-500  text-gray-700"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="location" className="block text-gray-700">
            Location:
          </label>
          <input
            type="text"
            id="location"
            className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-gray-500  text-gray-700"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="host" className="block text-gray-700">
            Host:
          </label>
          <input
            type="text"
            id="host"
            className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-gray-500  text-gray-700"
            value={host}
            onChange={(e) => setHost(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="images" className="block text-gray-700">
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
              setDate("");
              setTime("");
              setLocation("");
              setHost("");
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

export default EventForm;
