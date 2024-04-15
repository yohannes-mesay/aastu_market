import React, { useEffect, useState } from "react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import saveIcon from "../../Assets/saveicon.png";
import savedIcon from "../../Assets/savedicon.png";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../Context/AuthContext";
function Latestproduct() {
  const [latestProducts, setLatestProducts] = useState([]);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredImage, setHoveredImage] = useState(null);
  const [savedProducts, setSavedProducts] = useState([]);

  const getLatestProducts = async () => {
    try {
      const response = await axios.get(
        "https://aguero.pythonanywhere.com//product/?ordering=-posted_time "
      );
      setLatestProducts(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getLatestProducts();
  }, []);

  const scrollContainer = (scrollValue) => {
    setScrollLeft(scrollLeft + scrollValue);
    document.getElementById("scroll-content").scrollLeft += scrollValue;
  };

  const handleMouseEnter = (productId) => {
    setIsHovered(true);
    setHoveredImage(productId);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setHoveredImage(null);
  };

  const toggleSaved = (productId) => {
    if (savedProducts.includes(productId)) {
      setSavedProducts(savedProducts.filter((id) => id !== productId));
    } else {
      setSavedProducts([...savedProducts, productId]);
    }
  };

  const isSaved = (productId) => savedProducts.includes(productId);

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
    <div className="p-8 relative bg-[#EEEEEE]">
      <div className="text-center font-bold text-3xl my-8 relative">
        <p
          className="inline-block relative group"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <span className="font-light text-lg" style={{ color: "#000" }}>
            SHOP
          </span>
          <br />
          <span className="text-5xl text-gray-900"> Latest Products</span>
        </p>
        <span style={lineStyle}></span>
      </div>

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
          className="flex overflow-x-scroll scroll-smooth scrollbar-hide space-x-6 relative"
          style={{ scrollBehavior: "smooth", scrollLeft: scrollLeft + "px" }}
        >
          {latestProducts.map((product) => (
            <Link to={`/product/${product.id}`} key={product.id}>
              <div
                key={product.id}
                className="w-64 rounded-xl p-2 mb-4 relative hover:scale-110 hover:opacity-90 transition duration-300 ease-in-out cursor-pointer shadow-lg"
                onMouseEnter={() => handleMouseEnter(product.id)}
                onMouseLeave={handleMouseLeave}
                style={{
                  backgroundColor:
                    isHovered && hoveredImage === product.id
                      ? "#E5E7EB"
                      : "white",
                }}
              >
                <div className="flex flex-col items-center relative">
                  <div className="w-64 h-64 overflow-hidden mb-2 relative rounded-lg">
                    <img
                      src={`${BASE_URL}${product.image}`}
                      alt={product.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    {isHovered && hoveredImage === product.id && (
                      <img
                        src={isSaved(product.id) ? savedIcon : saveIcon}
                        alt="Save"
                        style={saveIconStyle}
                        onClick={() => toggleSaved(product.id)}
                      />
                    )}
                  </div>
                  <p
                    className="text-center mt-2 max-h-16 overflow-hidden whitespace-normal font-bold"
                    style={{ color: "#000" }}
                  >
                    {product.title}
                  </p>
                  <p className="text-gray-600">
                    {product.rating ? `${product.rating} stars` : "No rating"}
                  </p>
                  <p className="text-gray-600 text-center">
                    Price: ${product.price}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <button
          className="px-4 py-2"
          onClick={() => scrollContainer(100)}
          style={scrollButtonStyle}
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
}

export default Latestproduct;
