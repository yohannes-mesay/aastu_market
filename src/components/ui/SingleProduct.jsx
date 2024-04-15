import React, { useState } from "react";
import laptop from '../../../public/Images/laptop.jpg';

const SingleProduct = (props) => {
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredImage, setHoveredImage] = useState(null);

  const handleMouseEnter = (productId) => {
    setIsHovered(true);
    setHoveredImage(productId);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setHoveredImage(null);
  };

  return (
    <div
      key={props.id}
      className="w-64 border border-gray-300 rounded-lg p-2 mb-4 relative hover:scale-110 hover:opacity-90 transition duration-300 ease-in-out cursor-pointer"
      onMouseEnter={() => handleMouseEnter(props.id)}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex flex-col items-center relative">
        <div className="w-64 h-64 overflow-hidden mb-2 relative">
          <img src={props.image} alt={props.title} className="w-full h-full object-cover" />
          {/* {isHovered && hoveredImage===props.id ? <img src={isSaved(props.id) ? savedIcon : saveIcon} alt="Save" style={saveIconStyle} onClick={() => toggleSaved(props.id)}/> : '' } */}
        </div>
        <p className="text-center mt-2 max-h-16 overflow-hidden whitespace-normal font-bold">{props.title}</p>
        <p className="text-gray-600">{props.rating} stars</p>
        <p className="text-gray-600 text-center">Price: ${props.price}</p>
      </div>
    </div>
  );
};

export default SingleProduct;