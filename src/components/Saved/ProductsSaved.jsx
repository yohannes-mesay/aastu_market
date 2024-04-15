import React, { useEffect, useState } from "react";

import saveIcon from "../../Assets/saveicon.png";
import savedIcon from "../../Assets/savedicon.png";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSaved } from "../../Context/SavedContext";
import { BASE_URL } from "../../Context/AuthContext";

function ProductsSaved() {
  const [products, setproducts] = useState([]);
  const [services, setServices] = useState([]);
  const [events, setEvents] = useState([]);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredImage, setHoveredImage] = useState(null);
  const [savedProducts, setSavedProducts] = useState([]);
  const { getproducts, saveProduct } = useSaved();

  useEffect(function () {
    async function prodfetch() {
      const prod = await getproducts();
      setproducts(prod);
    }
    prodfetch();
  }, []);

  console.log(products);

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
    <div className="p-8 relative bg-sky-50">
      <div className="text-center font-bold text-3xl my-12 relative">
        <p
          className="inline-block relative group"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <span className="font-light text-lg">PRODUCTS</span>
          <br />
          <span className=" text-5xl text-gray-900"> Saved Products</span>
        </p>
        <span style={lineStyle}></span>
      </div>

      {products.length !== 0 ? (
        <div className="flex items-center justify-center space-x-4">
          <button
            className="px-4 py-2 "
            onClick={() => scrollContainer(-100)}
            style={scrollButtonStyle}
          >
            
          </button>
          <div
            id="scroll-content"
            className="flex overflow-x-scroll scroll-smooth scrollbar-hide space-x-6 relative"
            style={{ scrollBehavior: "smooth", scrollLeft: scrollLeft + "px" }}
          >
            {products.map((each) => (
              <Link to={`/product/${each.id}`} key={each.id}>
                {console.log("primg", each.product.image)}
                <div
                  key={each.product.id}
                  className="w-64  rounded-xl p-2 mb-4 relative hover:scale-110 hover:opacity-90 transition duration-300 ease-in-out cursor-pointer shadow-lg"
                  onMouseEnter={() => handleMouseEnter(each.product.id)}
                  onMouseLeave={handleMouseLeave}
                  style={{
                    backgroundColor:
                      isHovered && hoveredImage === each.product.id
                        ? "#E5E7EB"
                        : "white",
                  }}
                >
                  <div className="flex flex-col items-center relative">
                    <div className="w-64 h-64 overflow-hidden mb-2 relative rounded-lg">
                      <img
                        src={`${BASE_URL}${each.product.image}`}
                        alt={each.title}
                        className="w-full h-full object-cover rounded-lg"
                      />
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
                      </div>
                    </div>
                    <p className="text-center mt-2 max-h-16 overflow-hidden whitespace-normal font-bold">
                      {each.product.title}
                    </p>
                    <p className="text-gray-600">{each.product.rating} stars</p>
                    <p className="text-gray-600 text-center">
                      Price: ${each.product.price}
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
            
          </button>
        </div>
      ) : (
        <p>No saved products yet</p>
      )}
    </div>
  );
}

export default ProductsSaved;
