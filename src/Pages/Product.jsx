import React, { useState } from "react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import saveIcon from "../Assets/saveicon.png";
import savedIcon from "../Assets/savedicon.png";
import bag from "../Assets/bag.jpg";
import clothes from "../Assets/clothes.jpg";
import food from "../Assets/food.jpg";
import mobile from "../Assets/mobile.jpg";
import pc from "../Assets/pc.jpg";
import stationary from "../Assets/stationary.jpg";
import { Link } from "react-router-dom";
import Topratedproducts from "../components/Products/Topratedproducts";
import Latestproduct from "../components/Products/Latestproduct";
import Discoverproducts from "../components/Products/Discoverproducts";
import axios from "axios";
import { BASE_URL, useAuth } from "../Context/AuthContext";

function Product() {
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredImage, setHoveredImage] = useState(null);
  const [savedProducts, setSavedProducts] = useState([]);
  const { user } = useAuth();

  const handleSubmit = async (product) => {
    product.preventDefault();
    console.log("Searching for events:", searchValue);
    try {
      const response = await axios.get(
        `https://aguero.pythonanywhere.com/product/?search=${searchValue}`
      );
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error searching products:", error);
    }
  };
  const scrollButtonStyle = {
    marginTop: "-100px",
    fontSize: "30px",
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

  return (
    <div>
      <div className=" bg-[#272829]  text-white py-32 px-10 relative">
        <div className="max-w-6xl mx-auto text-center">
          <form onSubmit={handleSubmit}>
            <div className="flex items-center justify-center">
              <div
                className="relative flex items-stretch w-full  "
                style={{ maxWidth: "700px" }}
              >
                <input
                  type="text"
                  placeholder="Search products( title, description...)"
                  className="rounded-full py-3 px-2 border border-gray-200 text-gray-800 bg-white w-full pr-12"
                  value={searchValue}
                  onChange={(event) => setSearchValue(event.target.value)}
                  style={{
                    outline: "none",
                  }}
                />
                <button
                  type="submit"
                  className="absolute inset-y-0 right-0 flex items-center justify-center bg-[#31363F] hover:bg-orange-400 lighten-50 text-white rounded-full px-4 mr-1 mt-1 mb-1"
                  style={{ width: "120px" }}
                >
                  <svg
                    className="h-6 w-6 fill-current mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21.71 20.29l-5.23-5.23A7.93 7.93 0 0018 10c0-4.42-3.58-8-8-8s-8 3.58-8 8 3.58 8 8 8a7.93 7.93 0 004.06-1.11l5.23 5.23a1 1 0 001.42 0 1 1 0 000-1.42zM4 10a6 6 0 116 6 6 6 0 01-6-6z" />
                  </svg>
                  <span className="font-bold">Search</span>
                </button>
              </div>
            </div>
          </form>
          <h1 className="text-4xl  font-bold text-orange-400 mb-8 mt-8">
            Discover Our Amazing Products
          </h1>
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 flex justify-center items-end"
          style={{ marginBottom: "15px" }}
        >
          <div className="flex justify-between max-w-6xl gap-12">
            <div
              className="w-40 h-32 bg-white rounded-full "
              style={{
                backgroundImage: `url(${bag})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            <div
              className="w-40 h-32 bg-white rounded-full "
              style={{
                backgroundImage: `url(${clothes})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            <div
              className="w-40 h-32 bg-white rounded-full "
              style={{
                backgroundImage: `url(${food})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            <div
              className="w-40 h-32 bg-white rounded-full "
              style={{
                backgroundImage: `url(${mobile})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            <div
              className="w-40 h-32 bg-white rounded-full "
              style={{
                backgroundImage: `url(${pc})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            <div
              className="w-40 h-32 bg-white rounded-full "
              style={{
                backgroundImage: `url(${stationary})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
          </div>
        </div>
      </div>

      <div className="flex items-center bg-[#EEEEEE] justify-center space-x-4">
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
          {searchResults.map((product) => (
            <Link to={`/product/${product.id}`} key={product.id}>
              <div
                key={product.id}
                className="w-64 rounded-lg p-2 mb-4 mt-8 relative hover:scale-110 hover:opacity-90 transition duration-300 ease-in-out cursor-pointer shadow-lg"
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
                  <p className="text-center mt-2 max-h-16 overflow-hidden whitespace-normal font-bold">
                    {product.title}
                  </p>
                  <p className="text-gray-600">{product.rating} stars</p>
                  <p className="text-gray-600 text-center">
                    Price: ${product.price}
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

      <Topratedproducts />
      <Latestproduct />
      <Discoverproducts />
    </div>
  );
}

export default Product;
