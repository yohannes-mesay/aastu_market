import React, { useEffect, useState } from "react";
import { IoFilterSharp } from "react-icons/io5";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
import cancel from "../../Assets/cancel.png";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../Context/AuthContext";
import Cardskeleton from "../Skeleton/Cardskeleton";

function DiscoverProducts() {
  const [discoverProducts, setDiscoverProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showCategories, setShowCategories] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredImage, setHoveredImage] = useState(null);
  const [savedProducts, setSavedProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceFilter, setPriceFilter] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [isCustomPrice, setIsCustomPrice] = useState(false);
 const [loading, setLoading] = useState(true);

  const getDiscoverProducts = async (category = null, priceFilter = null) => {
    try {
      let apiUrl = "https://aguero.pythonanywhere.com/product/";
      const params = new URLSearchParams();

      if (category && category !== "All") {
        params.append("type", category);
      }

      if (priceFilter) {
        Object.entries(priceFilter).forEach(([key, value]) => {
          params.append(key, value);
        });
      }

      apiUrl += params.toString() ? `?${params.toString()}` : "";

      console.log("API URL:", apiUrl);
      const response = await axios.get(apiUrl);
      setDiscoverProducts(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    getDiscoverProducts();
  }, []);

  const toggleCategories = () => {
    setShowCategories(!showCategories);
    setIsFilterOpen(!isFilterOpen);
    if (!showCategories) {
      document.body.style.overflow = "hidden"; // Disable scrolling when filter menu is open
    } else {
      document.body.style.overflow = "auto"; // Enable scrolling when filter menu is closed
    }
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
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

  const cancelIconStyle = {
    position: "absolute",
    top: "10px",
    right: "8px",
    cursor: "pointer",
    width: "30px",
    height: "30px",
  };

  const indexOfLastItem = currentPage * 8;
  const indexOfFirstItem = indexOfLastItem - 8;
  const currentProducts = discoverProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setShowCategories(false);
    setIsFilterOpen(false);
    getDiscoverProducts(category);
    document.body.style.overflow = "auto";
  };

  const handleCancelClick = () => {
    setShowCategories(false);
    document.body.style.overflow = "auto"; // Enable scrolling when filter menu is closed
  };

  const handlePriceFilterChange = (priceFilter) => {
    setPriceFilter(priceFilter);
    getDiscoverProducts(null, priceFilter); // Call with only priceFilter parameter
  };

  const handleCustomPriceFilterApply = () => {
    setIsCustomPrice(false);
    const min = parseInt(minPrice);
    const max = parseInt(maxPrice);
    if (!isNaN(min) && !isNaN(max) && min <= max) {
      const priceFilter = { price__gt: min, price__lt: max };
      setPriceFilter(priceFilter);
      getDiscoverProducts(selectedCategory, priceFilter); // Call with both category and priceFilter
    }
  };
  return (
    <div className="p-8 bg-[#EEEEEE] relative">
      <div className="text-center font-bold text-3xl my-8 relative">
        <p className=" sm:inline-block relative group">
          <span className="font-light text-lg" style={{ color: "#000" }}>
            Shop by category
          </span>
          <br />
          <span className=" text-5xl text-gray-900">Shop by category</span>
        </p>
        <span style={lineStyle}></span>
        <div className="sm:hidden flex flex-wrap justify-between">
          <select
            className="block w-48 sm:w-auto border border-gray-300 p-2 rounded-md mb-2"
            onChange={(e) => handleCategoryChange(e.target.value)}
            value={selectedCategory}
            style={{ fontSize: "18px" }}
          >
            <option value="All">All</option>
            <option value="FD">Food</option>
            <option value="ST">Stationery</option>
            <option value="PC">Personal Computer</option>
            <option value="MB">Mobile</option>
            <option value="SK">Sticker</option>
            <option value="CL">Bag</option>
            <option value="CL">Clothes</option>
            <option value="PC">Other Electronics</option>
          </select>
          <select
            className="block w-48 sm:w-auto border border-gray-300 p-2 rounded-md mb-2"
            onChange={(e) => handlePriceFilterChange(e.target.value)}
            value={priceFilter}
            style={{ fontSize: "18px" }}
          >
            <option value="">Price</option>
            <option value="under300">Under Birr 300</option>
            <option value="bwt500&1000">Birr 500 to Birr 1000</option>
            <option value="over1000">Over Birr 1000</option>
          </select>
        </div>
      </div>

      <div className="hidden sm:block flex justify-end sm:mr-20 mb-6 relative">
        <button
          onClick={toggleCategories}
          className="flex items-center font-bold py-1 px-2 rounded-full border-2 border-black transition-transform duration-300"
          style={{
            zIndex: showCategories ? "30" : "auto",
            transform: showCategories ? "translateY(-7px)" : "none",
            boxShadow: "none",
            marginLeft: "auto",
            color: "#000",
          }}
          onMouseEnter={(e) =>
            (e.target.style.boxShadow = "0 8px 12px rgba(0, 0, 0, 0.4)")
          }
          onMouseLeave={(e) => (e.target.style.boxShadow = "none")}
        >
          <IoFilterSharp className="mr-2" />
          Filters
        </button>
      </div>

      <div
        className={`fixed bottom-0 right-0 left-0 top-0 h-full w-full max-w-sm bg-white border border-gray-300 rounded shadow-md py-8 px-16 z-10 transform transition-transform ${
          showCategories ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <img
          src={cancel}
          alt="Cancel"
          style={cancelIconStyle}
          onClick={handleCancelClick}
        />
        <h2 className="text-2xl sm:text-4xl font-light mb-2 sm:mb-4 italic text-gray-900">
          Filters
        </h2>
        <div style={{ marginLeft: "-10px" }}>
          <h3 className="text-md font-semibold mb-1" style={{ color: "#000" }}>
            Categories
          </h3>
          <ul style={{ color: "#000" }}>
            <li
              className="cursor-pointer py-1 px-2 "
              onClick={() => handleCategoryChange("FD")}
            >
              <input
                type="radio"
                id="Food"
                name="category"
                checked={selectedCategory === "FD"}
                onChange={() => handleCategoryChange("FD")}
              />
              <label htmlFor="Food">Food</label>
            </li>
            <li
              className="cursor-pointer py-1 px-2 "
              onClick={() => handleCategoryChange("ST")}
            >
              <input
                type="radio"
                id="Stationery"
                name="category"
                checked={selectedCategory === "ST"}
                onChange={() => handleCategoryChange("ST")}
              />
              <label htmlFor="Stationery">Stationery</label>
            </li>
            <li
              className="cursor-pointer py-1 px-2 "
              onClick={() => handleCategoryChange("PC")}
            >
              <input
                type="radio"
                id="Personal Computer"
                name="category"
                checked={selectedCategory === "PC"}
                onChange={() => handleCategoryChange("PC")}
              />
              <label htmlFor="Personal Computer">Personal Computer</label>
            </li>
            <li
              className="cursor-pointer py-1 px-2 "
              onClick={() => handleCategoryChange("MB")}
            >
              <input
                type="radio"
                id="Mobile"
                name="category"
                checked={selectedCategory === "MB"}
                onChange={() => handleCategoryChange("MB")}
              />
              <label htmlFor="Mobile">Mobile</label>
            </li>
            <li
              className="cursor-pointer py-1 px-2 "
              onClick={() => handleCategoryChange("SK")}
            >
              <input
                type="radio"
                id="Sticker"
                name="category"
                checked={selectedCategory === "SK"}
                onChange={() => handleCategoryChange("SK")}
              />
              <label htmlFor="Sticker">Sticker</label>
            </li>
            <li
              className="cursor-pointer py-1 px-2 "
              onClick={() => handleCategoryChange("BG")}
            >
              <input
                type="radio"
                id="Bag"
                name="category"
                checked={selectedCategory === "BG"}
                onChange={() => handleCategoryChange("BG")}
              />
              <label htmlFor="Bag">Bag</label>
            </li>
            <li
              className="cursor-pointer py-1 px-2 "
              onClick={() => handleCategoryChange("CL")}
            >
              <input
                type="radio"
                id="Clothes"
                name="category"
                checked={selectedCategory === "CL"}
                onChange={() => handleCategoryChange("CL")}
              />
              <label htmlFor="Clothes">Clothes</label>
            </li>
            <li
              className="cursor-pointer py-1 px-2 "
              onClick={() => handleCategoryChange("OE")}
            >
              <input
                type="radio"
                id="Other Electronics"
                name="category"
                checked={selectedCategory === "OE"}
                onChange={() => handleCategoryChange("OE")}
              />
              <label htmlFor="Other Electronics">Other Electronics</label>
            </li>
            <li
              className="cursor-pointer py-1 px-2 "
              onClick={() => handleCategoryChange("OT")}
            >
              <input
                type="radio"
                id="Other Electronics"
                name="category"
                checked={selectedCategory === "OT"}
                onChange={() => handleCategoryChange("OT")}
              />
              <label htmlFor="Other Electronics">Other </label>
            </li>
          </ul>
        </div>
        <div style={{ marginLeft: "-10px" }}>
          <h3
            className="text-md font-semibold mb-1 mt-2"
            style={{ color: "#000" }}
          >
            Price (Birr)
          </h3>
          <ul style={{ color: "#000" }}>
            <li
              className="cursor-pointer py-1 px-2 "
              onClick={() => handlePriceFilterChange({ price__lt: 300 })}
            >
              <input type="radio" id="under 300" name="category" />
              <label htmlFor="under 300">Under Birr 300</label>
            </li>
            <li
              className="cursor-pointer py-1 px-2 "
              onClick={() =>
                handlePriceFilterChange({ price__gt: 500, price__lt: 1000 })
              }
            >
              <input type="radio" id="bwt 500&1000" name="category" />
              <label htmlFor="bwt 500&1000">Birr 500 to Birr 1000</label>
            </li>
            <li
              className="cursor-pointer py-1 px-2 "
              onClick={() => handlePriceFilterChange({ price__gt: 1000 })}
            >
              <input type="radio" id="over 1000" name="category" />
              <label htmlFor="over 1000">Over Birr 1000 </label>
            </li>
            <li
              className="cursor-pointer py-1 px-2"
              onClick={() => setIsCustomPrice(true)}
            >
              <input type="radio" id="custom" name="category" />
              <label htmlFor="custom">Custom</label>
            </li>
          </ul>
          {isCustomPrice && (
            <div className="flex items-center mb-2 ">
              <input
                type="number"
                placeholder="Min"
                className="border border-gray-300 p-1 rounded-md mr-2 w-24"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
              <span className="mr-2">to</span>
              <input
                type="number"
                placeholder="Max"
                className="border border-gray-300 p-1  rounded-md w-24"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
              <button
                onClick={handleCustomPriceFilterApply} // Apply custom price filter
                className="bg-[#31363F] hover:bg-orange-400 text-white font-bold py-1 px-2 rounded-full ml-4"
              >
                Go
              </button>
            </div>
          )}
        </div>
      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {loading ? (
          // Render skeleton cards while data is loading
          <>
            <Cardskeleton />
            <Cardskeleton />
            <Cardskeleton />
            <Cardskeleton />
            <Cardskeleton />
            <Cardskeleton />
            <Cardskeleton />
            <Cardskeleton />
          </>
        ) : (
        currentProducts.map((product) => (
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
        {/* Render empty placeholders if there are less than 8 products */}
        {!loading && currentProducts.length < 8 &&
          [...Array(8 - currentProducts.length)].map((_, index) => (
            <div key={`placeholder-${index}`} className="w-64 h-64"></div>
          ))}
      </div>
      <div className="flex justify-center mt-4" style={{ color: "#000" }}>
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 border rounded-lg focus:outline-none bg-slate-200 mr-4"
        >
          <FaCaretLeft /> {/* Left Icon */}
        </button>
        <p>{currentPage}</p>
        <button
          onClick={handleNextPage}
          disabled={currentProducts.length < 8}
          className="px-4 py-2 border rounded-lg focus:outline-none bg-slate-200 ml-4"
        >
          <FaCaretRight /> {/* Right Icon */}
        </button>
      </div>
    </div>
  );
}

export default DiscoverProducts;
