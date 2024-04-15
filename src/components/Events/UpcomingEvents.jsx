import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../Context/AuthContext";
import Cardskeleton from "../Skeleton/Cardskeleton";

function UpcomingEvents() {
  const [events, setEvents] = useState([]);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredImage, setHoveredImage] = useState(null);
   const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getExploreEvents = async () => {
      try {
        const response = await axios.get(
          "https://aguero.pythonanywhere.com/event/?ordering=event_date "
        );
        setEvents(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    getExploreEvents();
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
    <div className="p-8 bg-[#EEEEEE] relative">
      <div className="text-center font-bold text-3xl my-8 relative">
        <p
          className="inline-block relative group text-gray-900"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <span className="font-light text-lg">EVENTS</span>
          <br />
          <span className=" text-5xl">Upcoming Events</span>
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
          className="flex overflow-x-scroll scroll-smooth scrollbar-hide space-x-4 relative"
          style={{ scrollBehavior: "smooth", scrollLeft: scrollLeft + "px" }}
        >
           {loading ? (
          <>
            <Cardskeleton />
            <Cardskeleton />
            <Cardskeleton />
        </>
        ) : (
          events.map((event) => (
            <Link to={`/event/${event.id}`} key={event.id}>
              {console.log("event", event)}
              <div
                key={event.id}
                className="w-64 rounded-lg p-2 mb-4 relative hover:scale-110 hover:opacity-90 transition duration-300 ease-in-out cursor-pointer shadow-lg"
                onMouseEnter={() => handleMouseEnter(event.id)}
                onMouseLeave={handleMouseLeave}
                style={{
                  backgroundColor:
                    isHovered && hoveredImage === event.id
                      ? "#E5E7EB"
                      : "white",
                }}
              >
                <div className="flex flex-col items-center relative">
                  <div className="w-64 h-64 overflow-hidden mb-2 relative rounded-lg">
                    <img
                      src={`${BASE_URL}${event.image}`}
                      alt={event.title}
                      className="w-full h-full object-cover rounded-lg"
                    />

                    
                  </div>
                  <p
                    className="text-center mt-2 max-h-16 overflow-hidden whitespace-normal font-bold"
                    style={{ color: "#000" }}
                  >
                    {event.title}
                  </p>
                  <p className="text-gray-600">Organizer: {event.organizer} </p>
                  <p className="text-gray-600 text-center">
                    {event.event_date}
                  </p>
                </div>
              </div>
            </Link>
           ))
          )}
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

export default UpcomingEvents;
