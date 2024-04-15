import React, { useState } from 'react';
import { FaChevronRight,FaChevronLeft } from "react-icons/fa";
import saveIcon from '../Assets/saveicon.png';
import savedIcon from '../Assets/savedicon.png';
import { Link } from 'react-router-dom';
import UpcomingEvents from '../components/Events/UpcomingEvents'
import eventhero from "../Assets/eventhero.jpg"
import axios from 'axios';
import { BASE_URL } from '../Context/AuthContext';

function Event() {
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredImage, setHoveredImage] = useState(null);
  const [savedEvents, setSavedEvents] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Searching for events:', searchValue);
    try {
      const response = await axios.get(`https://aguero.pythonanywhere.com/event/?search=${searchValue}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error searching events:', error);
    }
  };
  const scrollButtonStyle = {
    marginTop: "-100px",
    fontSize: "30px",
  };
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

  const toggleSaved = (eventId) => {
    if (savedEvents.includes(eventId)) {
      setSavedEvents(savedEvents.filter((id) => id !== eventId));
    } else {
      setSavedEvents([...savedEvents, eventId]);
    }
  };

  const isSaved = (eventId) => savedEvents.includes(eventId);
  const hasSearchResults = searchResults.length > 0;

  return (
    <div>
      <div className="bg-gray-900  py-20 px-10" style={{ backgroundImage: `url(${eventhero})`, backgroundSize: 'cover', backgroundPosition: 'center bottom' }}>
        <div className="max-w-6xl mx-auto text-center relative">
          <form onSubmit={handleSubmit}>
            <div className="flex items-center justify-center">
              <div className="relative flex items-stretch w-full mt-4" style={{ maxWidth: '700px' }}>
                <input
                  type="text"
                  placeholder="Search events(title, description, organizer... )"
                  className="rounded-full py-3 px-4 border border-gray-200 text-gray-800 bg-white w-full pr-12"
                  value={searchValue}
                  onChange={(event) => setSearchValue(event.target.value)}
                  style={{ outline: 'none' }}
                />
                <button type="submit" className="absolute inset-y-0 right-0 flex items-center justify-center bg-[#31363F] hover:bg-orange-400 text-white rounded-full px-4 mr-1 mt-1 mb-1" style={{ width: '120px' }}>
                  <svg className="h-6 w-6 fill-current mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M21.71 20.29l-5.23-5.23A7.93 7.93 0 0018 10c0-4.42-3.58-8-8-8s-8 3.58-8 8 3.58 8 8 8a7.93 7.93 0 004.06-1.11l5.23 5.23a1 1 0 001.42 0 1 1 0 000-1.42zM4 10a6 6 0 116 6 6 6 0 01-6-6z"/>
                  </svg>
                  <span className="font-bold">Search</span>
                </button>
              </div>
            </div>
          </form>
          <h1 className="text-5xl font-bold mb-4 mt-4">Discover Our Exciting Events</h1>
          <p className="text-2xl mb-8 text-white">Join us for unforgettable events filled with fun, learning, and networking opportunities.</p>
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
          style={{ scrollBehavior: "smooth", scrollLeft: scrollLeft + "px" }}
        >

        {searchResults.map((event) => (
           <Link to={`/event/${event.id}`} key={event.id}>
  <div
    key={event.id}
    className="w-64 rounded-lg p-2 mb-4 mt-8 relative hover:scale-110 hover:opacity-90 transition duration-300 ease-in-out cursor-pointer shadow-lg"
    onMouseEnter={() => handleMouseEnter(event.id)}
    onMouseLeave={handleMouseLeave}
    style={{ backgroundColor: isHovered && hoveredImage === event.id ? "#E5E7EB" : "white" }}
  >
    <div className="flex flex-col items-center relative">
      <div className="w-64 h-64 overflow-hidden mb-2 relative rounded-lg">
        <img src={`${BASE_URL}${event.image}`}
        alt={event.title} 
        className="w-full h-full object-cover rounded-lg" />
        
        {isHovered && hoveredImage === event.id && (
          <img
            src={isSaved(event.id) ? savedIcon : saveIcon}
            alt="Save"
            style={saveIconStyle}
            onClick={() => toggleSaved(event.id)}
          />
        )}
      </div>
      <p className="text-center mt-2 max-h-16 overflow-hidden whitespace-normal font-bold">{event.title}</p>
      <p className="text-gray-600">{event.organizer} </p>
      <p className="text-gray-600 text-center">{event.event_date}</p>
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
      <UpcomingEvents/>
    </div>
  )
}

export default Event;
