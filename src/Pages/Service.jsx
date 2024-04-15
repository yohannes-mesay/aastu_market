import React, { useState } from 'react';
import { FaChevronRight,FaChevronLeft } from "react-icons/fa";
import saveIcon from '../Assets/saveicon.png';
import savedIcon from '../Assets/savedicon.png';
import { Link } from 'react-router-dom';
import Topservices from '../components/Services/Topservices'
import OurServices from '../components/Services/OurServices'
import servicehero from "../Assets/servicehero.jpg"
import axios from 'axios';
import { BASE_URL } from '../Context/AuthContext';


function Service() {
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredImage, setHoveredImage] = useState(null);
  const [savedServices, setSavedServices] = useState([]);

  const handleSubmit = async (service) => {
    service.preventDefault();
    console.log('Searching for services:', searchValue);
    try {
      const response = await axios.get(`https://aguero.pythonanywhere.com/service/?search=${searchValue}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error searching services:', error);
    }
  };


   const scrollButtonStyle = {
    marginTop: '-100px', 
    fontSize: '30px', 
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

  const scrollContainer = (scrollValue) => {
    setScrollLeft(scrollLeft + scrollValue);
    document.getElementById('scroll-content').scrollLeft += scrollValue;
  };

  const isSaved = (serviceId) => savedServices.includes(serviceId);
  
  const saveIconStyle = {
    display: isHovered ? 'block' : 'none',
    position: 'absolute',
    top: '8px',
    right: '8px',
    backgroundColor: 'white' ,
    borderRadius: '50%',
    padding: '5px',
    cursor: 'pointer',
    transition: 'opacity 0.3s',
  };
 const hasSearchResults = searchResults.length > 0;

  searchResults.map(each=>{
    console.log(each)
  })

  return (
    <div>
      <div className="bg-gray-900 text-black py-20 px-10 " style={{ backgroundImage: `url(${servicehero})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
  <div className="max-w-6xl mx-auto text-center">
   <form onSubmit={handleSubmit}>
  <div className="flex items-center justify-center">
    <div className="relative flex items-stretch w-full" style={{ maxWidth: '700px' }}>
      <input
        type="text"
        placeholder="Search services( title, description...)"
        className="rounded-full py-4 px-5 border border-gray-200 text-gray-800 bg-white w-full pr-12"
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
        style={{
    outline: 'none'}}
      />
      <button type="submit" className="absolute inset-y-0 right-0 flex items-center justify-center  bg-[#31363F] hover:bg-orange-400 text-white rounded-full px-4 mr-1 mt-1 mb-1"style={{ width: '120px' }}>
        <svg className="h-6 w-6 fill-current mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M21.71 20.29l-5.23-5.23A7.93 7.93 0 0018 10c0-4.42-3.58-8-8-8s-8 3.58-8 8 3.58 8 8 8a7.93 7.93 0 004.06-1.11l5.23 5.23a1 1 0 001.42 0 1 1 0 000-1.42zM4 10a6 6 0 116 6 6 6 0 01-6-6z"/>
        </svg>
        <span className="font-bold">Search</span>
      </button>
    </div>
  </div>
</form>
 <h1 className="text-6xl text-white font-bold mb-4 mt-8">Discover Our Services</h1>
  </div>
</div>
{hasSearchResults && (
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
          style={{ scrollBehavior: 'smooth', scrollLeft: scrollLeft + 'px' }}
        >
          {searchResults.map((service) => (
  <Link to={`/service/${service.id}`} key={service.id}>
    <div 
      key={service.id} 
      className="w-64 rounded-lg p-2 mb-4 mt-8 relative hover:scale-110 hover:opacity-90 transition duration-300 ease-in-out cursor-pointer shadow-lg"
      onMouseEnter={() => handleMouseEnter(service.id)}
      onMouseLeave={handleMouseLeave}
      style={{ backgroundColor: isHovered && hoveredImage === service.id ? "#E5E7EB" : "white" }}
    >
      <div className="flex flex-col items-center relative">
        <div className="w-64 h-64 overflow-hidden mb-2 relative rounded-lg">
          <img src={`${BASE_URL}${service.image}`} alt={service.title} className="w-full h-full object-cover rounded-lg" />
          {isHovered && hoveredImage === service.id && (
            <img src={isSaved(service.id) ? savedIcon : saveIcon} alt="Save" style={saveIconStyle} onClick={() => toggleSaved(service.id)} />
          )}
        </div>
        <p className="text-center mt-2 max-h-16 overflow-hidden whitespace-normal font-bold">{service.title}</p>
        <p className="text-gray-600">3 stars</p>
        <p className="text-gray-600 text-center">Price: ${service.price}</p>
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
)}
     <Topservices />
      <OurServices/>
      
    </div>
  );
}

export default Service;
