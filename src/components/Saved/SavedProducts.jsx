import React, { useEffect, useState } from "react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../Context/AuthContext";

function SavedProducts() {
  const [savedProducts, setSavedProducts] = useState([]);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredImage, setHoveredImage] = useState(null);

  const getSavedProducts = async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      setSavedProducts(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getSavedProducts();
  }, []);

  const scrollContainer = (scrollValue) => {
    setScrollLeft(scrollLeft + scrollValue);
    document.getElementById("scroll-content").scrollLeft += scrollValue;
  };

  const handleMouseEnter = (eventId) => {
    setIsHovered(true);
    setHoveredImage(eventId);
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
  const removeIconStyle = {
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
    fontSize: "40px",
  };

  return (
    <div className="p-8 relative">
      <div className="text-center font-bold text-3xl my-8 relative">
        <p
          className="inline-block relative group"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <span>Saved Products</span>
          <br />
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
          className="flex overflow-x-scroll scroll-smooth scrollbar-hide space-x-4 relative"
          style={{ scrollBehavior: "smooth", scrollLeft: scrollLeft + "px" }}
        >
          {savedProducts.map((product) => (
            <Link to={`/product/${product.id}`} key={product.id}>
              <div
                key={product.id}
                className="w-64  rounded-lg p-2 mb-4 relative hover:scale-110 hover:opacity-90 transition duration-300 ease-in-out cursor-pointer"
                onMouseEnter={() => handleMouseEnter(product.id)}
                onMouseLeave={handleMouseLeave}
              >
                <div className="flex flex-col items-center relative">
                  <div className="w-64 h-64 overflow-hidden mb-2 relative">
                    <img
                      src={`${BASE_URL}${product.image}`}
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                    {isHovered && hoveredImage === product.id && (
                      <MdDeleteOutline
                        size={30}
                        style={removeIconStyle}
                        onClick={() => toggleSaved(product.id)}
                      />
                    )}
                  </div>
                  <p className="text-center mt-2 max-h-16 overflow-hidden whitespace-normal font-bold">
                    {product.title}
                  </p>
                  <p className="text-gray-600">{product.rating.rate} stars</p>
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

export default SavedProducts;
