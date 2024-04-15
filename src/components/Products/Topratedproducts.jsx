import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../Context/AuthContext";
import Cardskeleton from "../Skeleton/Cardskeleton";

function TopRatedProducts() {
  const [topRatedProducts, setTopRatedProducts] = useState([]);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredImage, setHoveredImage] = useState(null);
  const [savedProducts, setSavedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const getTopRatedProducts = async () => {
    try {
      const response = await axios.get(
        "https://aguero.pythonanywhere.com/product/"
      );
      console.log(response.data); // Log the fetched data directly
      setTopRatedProducts(response.data);
      setLoading(false); // Log the state value in the next render cycle
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getTopRatedProducts();
  }, []);

  const scrollContainer = (scrollValue) => {
    const scrollElement = document.getElementById("scroll-content");
    console.log("Scrolling...");
    if (scrollElement) {
      scrollElement.scrollLeft += scrollValue;
      setScrollLeft(scrollElement.scrollLeft);
      console.log("scrollLeft:", scrollElement.scrollLeft);
    }
  };

  const handleMouseEnter = (productId) => {
    setIsHovered(true);
    setHoveredImage(productId);
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
      <div className="text-center font-bold text-3xl my-12 relative">
        <p
          className="inline-block relative group"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <span className="font-light text-lg" style={{ color: "#000" }}>
            PRODUCTS
          </span>
          <br />
          <span className=" text-5xl text-gray-900"> Top Rated</span>
        </p>
        <span style={lineStyle}></span>
      </div>

      <div className="flex items-center justify-center space-x-4">
        <button
          className="px-4 py-2 "
          onClick={() => scrollContainer(-100)}
          style={scrollButtonStyle}
        ></button>
        <div
          id="scroll-content"
          className="flex overflow-x-scroll scroll-smooth scrollbar-hide space-x-6 relative"
          style={{ scrollBehavior: "smooth", scrollLeft: scrollLeft + "px" }}
        >
      {loading ? (
          <>
            <Cardskeleton />
            <Cardskeleton />
            <Cardskeleton />
        </>
        ) : (
          topRatedProducts.map((product) => (
            //--------------Single Product ---------------------

            <Link to={`/product/${product.id}`} key={product.id}>
              <div
                key={product.id}
                className="w-64  rounded-xl p-2 mb-4 relative hover:scale-110 hover:opacity-90 transition duration-300 ease-in-out cursor-pointer shadow-lg"
                onMouseEnter={() => handleMouseEnter(product.id)}
                onMouseLeave={handleMouseLeave}
                style={{
                  backgroundColor:
                    isHovered && hoveredImage === product.id
                      ? "#E5E7EB"
                      : "white",
                }}
              >
                {/* {isHovered && hoveredImage === product.id && (
                      <img
                        src={isSaved(product.id) ? savedIcon : saveIcon}
                        alt="Save"
                        style={saveIconStyle}
                        onClick={() => toggleSaved(product.id)}
                      />
                    )} */}
                <div className="flex flex-col items-center relative">
                  <div className="w-64 h-64 overflow-hidden mb-2 relative rounded-lg">
                    <img
                      src={`${BASE_URL}${product.image}`}
                      alt={product.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    
                  </div>
                  <p
                    className="text-center mt-2 max-h-16 overflow-hidden whitespace-normal font-bold"
                    style={{ color: "#000" }}
                  >
                    {product.title}
                  </p>
                  <p className="text-gray-600">{product.rating} stars</p>
                  <p className="text-gray-600 text-center">
                    Price: ${product.price}
                  </p>
                </div>
              </div>
            </Link>
          ))
          )}

          {/* -----------------------Single product end----------------- */}
        </div>
        <button
          className="px-4 py-2 "
          onClick={() => scrollContainer(100)}
          style={scrollButtonStyle}
        ></button>
      </div>
    </div>
  );
}

export default TopRatedProducts;
