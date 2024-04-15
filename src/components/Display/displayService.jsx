import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../Context/AuthContext";

function displayService() {
  const [featuredServices, setFeaturedServices] = useState([]);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredImage, setHoveredImage] = useState(null);
  const [savedServices, setSavedServices] = useState([]);

  const getFeaturedServices = async () => {
    try {
      const response = await axios.get(
        "https://aguero.pythonanywhere.com/service/?ordering=-posted_time"
      );
      setFeaturedServices(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getFeaturedServices();
  }, []);

  const scrollContainer = (scrollValue) => {
    setScrollLeft((prevScrollLeft) => prevScrollLeft + scrollValue);
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

  const lineStyle = {
    width: isHovered ? "35%" : "0%",
    height: "2px",
    backgroundColor: "rgb(11, 11, 63)",
    display: "block",
    margin: "8px auto",
    transition: "width 0.7s",
  };

  return (
    <div className="p-8">
      <div className="text-center font-bold text-3xl my-8 relative">
        <p
          className="inline-block relative group"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <span className="font-light text-lg">SERVICES</span>
          <br />
        </p>
        <span style={lineStyle}></span>
      </div>
      <div className="flex items-center justify-center space-x-4">
        <button
          className="px-4 py-2"
          onClick={() => scrollContainer(-100)}
        ></button>
        <div
          id="scroll-content"
          className="flex overflow-x-scroll scroll-smooth scrollbar-hide space-x-4 relative"
          style={{ scrollBehavior: "smooth", scrollLeft: scrollLeft + "px" }}
        >
          {featuredServices.map((service) => (
            <Link to={`/services/`} key={service}>
              <div
                key={service.id}
                className="w-64 rounded-lg p-2 mb-4 relative hover:scale-110 hover:opacity-90 transition duration-300 ease-in-out cursor-pointer shadow-lg"
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
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <button
          className="px-4 py-2"
          onClick={() => scrollContainer(100)}
        ></button>
      </div>
    </div>
  );
}

export default displayService;
