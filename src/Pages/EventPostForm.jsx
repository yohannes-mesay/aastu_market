import React, { useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { useProduct } from "../Context/ProductContext";
import { data } from "autoprefixer";

const EventForm = () => {
  const [name, setName] = useState("new");
  const [description, setDescription] = useState("new");
  const [date, setDate] = useState("new");
  const [time, setTime] = useState("new");
  const [location, setLocation] = useState("new");
  const [host, setHost] = useState("new");
  const [images, setImages] = useState([]);
  const { uploadEvent } = useProduct();
  const [eventData, setEventData] = useState({
    title: "",
    organizer: "",
    description: "",
    event_date: "",
    event_time: "",
    event_place: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image" && files.length > 0) {
      setEventData({ ...eventData, image: files[0] });
    } else {
      setEventData({ ...eventData, [name]: value });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const uploaded = await uploadEvent(eventData);
    const formData = new FormData();
    Object.entries(eventData).forEach(([key, value]) => {
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
        Post a New Event
      </h5>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-gray-700">
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-gray-500  text-gray-700"
            value={eventData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-gray-700">
            Description:
          </label>
          <textarea
            id="description"
            className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-gray-500  text-gray-700"
            rows="3"
            name="description"
            value={eventData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="date" className="block text-gray-700">
            Date:
          </label>
          <input
            type="date"
            id="date"
            name="event_date"
            className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-gray-400  text-gray-700"
            value={eventData.event_date}
            onChange={handleChange}
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
            name="event_time"
            className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-gray-500  text-gray-700"
            value={eventData.event_time}
            onChange={handleChange}
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
            name="event_place"
            className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-gray-500  text-gray-700"
            value={eventData.event_place}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="host" className="block text-gray-700">
            Organizer:
          </label>
          <input
            type="text"
            id="host"
            name="organizer"
            className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-gray-500  text-gray-700"
            value={eventData.organizer}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="images" className="block text-gray-700">
            Upload Image:
          </label>
          <input
            type="file"
            name="image"
            id="images"
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
