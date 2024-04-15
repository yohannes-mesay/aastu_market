import React, { useEffect, useState } from "react";
import { FaChevronRight } from "react-icons/fa6";
import { FaChevronLeft } from "react-icons/fa";
import saveIcon from "../../Assets/saveicon.png";
import savedIcon from "../../Assets/savedicon.png";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSaved } from "../../Context/SavedContext";
import { BASE_URL } from "../../Context/AuthContext";

function Topservices() {
  const [services, setServices] = useState([]);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredImage, setHoveredImage] = useState(null);
  const [savedServices, setSavedServices] = useState([]);
  const { getServices } = useSaved();
  useEffect(function () {
    async function prodfetch() {
      const prod = await getServices();
      setServices(prod);
      console.log("prod", prod);
    }
    prodfetch();
  }, []);
  <div className="bg-white  rounded-full w-9 h-9 p-1 flex items-center justify-center absolute top-5 right-5 cursor-pointer	">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="#000"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="none"
      className="w-6 h-6 "
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
      />
    </svg>
  </div>;
  const getservices = async () => {
    try {
      const response = await axios.get(
        "https://aguero.pythonanywhere.com/service/0/save "
      );
      setServices(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getservices();
  }, []);

  const scrollContainer = (scrollValue) => {
    setScrollLeft(scrollLeft + scrollValue);
    document.getElementById("scroll-content").scrollLeft += scrollValue;
  };

  const handleMouseEnter = (serviceId) => {
    setIsHovered(true);
    setHoveredImage(serviceId);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setHoveredImage(null);
  };

  const toggleSaved = (serviceId) => {
    if (savedServices.includes(serviceId)) {
      setSavedServices(savedServices.filter((id) => id !== serviceId));
    } else {
      setSavedServices([...savedServices, serviceId]);
    }
  };

  const isSaved = (serviceId) => savedServices.includes(serviceId);

  const lineStyle = {
    width: isHovered ? "35%" : "0%",
    height: "2px",
    backgroundColor: "rgb(11, 11, 63)",
    display: "block",
    margin: "8px auto",
    transition: "width 0.7s",
  };
  const saveIconStyle = {
    display: isHovered ? "block" : "none",
    position: "absolute",
    top: "8px",
    right: "8px",
    backgroundColor: "white",
    borderRadius: "50%",
    padding: "5px",
    cursor: "pointer",
    transition: "opacity 0.3s",
  };

  const scrollButtonStyle = {
    marginTop: "-100px",
    fontSize: "30px",
  };

  return (
    <div className="p-8 bg-sky-50 relative">
      <div className="text-center font-bold text-3xl my-8 relative">
        <p
          className="inline-block text-gray-900 relative group"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <span className="font-light text-lg">SERVICES</span>
          <br />
          <span className=" text-5xl"> Saved Services</span>
        </p>
        <span style={lineStyle}></span>
      </div>

      {services.length !== 0 ? (
        <div className="flex items-center justify-center space-x-4">
          <button
            className="px-4 py-2 "
            onClick={() => scrollContainer(-100)}
            style={scrollButtonStyle}
          >
            <FaChevronLeft />
          </button>
          <div
            id="scroll-content"
            className="flex overflow-x-scroll scroll-smooth scrollbar-hide space-x-4 relative"
            style={{ scrollBehavior: "smooth", scrollLeft: scrollLeft + "px" }}
          >
            {services.map((service) => (
              <Link to={`/service/${service.id}`} key={service.id}>
                <div
                  key={service.id}
                  className="w-64 rounded-lg p-2 mb-4 mt-8 relative hover:scale-110 hover:opacity-90 transition duration-300 ease-in-out cursor-pointer shadow-lg"
                  onMouseEnter={() => handleMouseEnter(service.id)}
                  onMouseLeave={handleMouseLeave}
                  style={{
                    backgroundColor:
                      isHovered && hoveredImage === service.id
                        ? "#E5E7EB"
                        : "white",
                  }}
                >
                  <div className="flex flex-col items-center relative">
                    <div className="w-64 h-64 overflow-hidden mb-2 relative rounded-lg">
                      <img
                        src={`${BASE_URL}${service.image}`}
                        alt={service.title}
                        className="w-full h-full object-cover rounded-lg"
                      />
                      {isHovered && hoveredImage === service.id && (
                        <img
                          src={isSaved(service.id) ? savedIcon : saveIcon}
                          alt="Save"
                          style={saveIconStyle}
                          onClick={() => toggleSaved(service.id)}
                        />
                      )}
                    </div>
                    <p className="text-center mt-2 max-h-16 overflow-hidden whitespace-normal font-bold">
                      {service.title}
                    </p>
                    {service.rating && service.rating.rate !== undefined ? (
                      <p className="text-gray-600">
                        {service.rating.rate} stars
                      </p>
                    ) : (
                      <p className="text-gray-600">Rating: 0</p>
                    )}
                    <p className="text-gray-600 text-center">
                      Price: ${service.price}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <button
            className="px-4 py-2 "
            onClick={() => scrollContainer(100)}
            style={scrollButtonStyle}
          >
            <FaChevronRight />
          </button>
        </div>
      ) : (
        <p> No saved services yet</p>
      )}
    </div>
  );
}

export default Topservices;
