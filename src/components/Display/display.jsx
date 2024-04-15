import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function display() {
  const [topRatedProducts, setTopRatedProducts] = useState([]);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredImage, setHoveredImage] = useState(null);

  useEffect(() => {
    const getTopRatedProducts = async () => {
      try {
        const response = await axios.get(
          "https://aguero.pythonanywhere.com/product/"
        );
        setTopRatedProducts(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    getTopRatedProducts();
  }, []);

  const handleMouseEnter = (productId) => {
    setIsHovered(true);
    setHoveredImage(productId);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setHoveredImage(null);
  };

  const scrollContainer = (scrollValue) => {
    setScrollLeft((prevScrollLeft) => prevScrollLeft + scrollValue);
  };

  return (
    <div className="p-8 relative">
      <div className="text-center font-bold text-3xl my-12 relative">
        <p
          className="inline-block relative group"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <span className="font-light text-lg">PRODUCTS</span>
        </p>
        <span
          className="lineStyle"
          style={{ width: isHovered ? "35%" : "0%" }}
        ></span>
      </div>
      <div className="flex items-center justify-center space-x-4">
        <button
          className="px-4 py-2"
          onClick={() => scrollContainer(-100)}
          style={{ marginTop: "-100px", fontSize: "30px" }}
        ></button>
        <div
          id="scroll-content"
          className="flex overflow-x-scroll scroll-smooth scrollbar-hide space-x-6 relative"
          style={{ scrollBehavior: "smooth", scrollLeft: scrollLeft + "px" }}
        >
          {topRatedProducts.map((product) => (
            <Link to={`/products/`} key={product}>
              <div
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
                      src={product.image}
                      alt={product.title}
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
          style={{ marginTop: "-100px", fontSize: "30px" }}
        ></button>
      </div>
    </div>
  );
}

export default display;
