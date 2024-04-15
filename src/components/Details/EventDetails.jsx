import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BookmarkSimple } from "phosphor-react";
import ReviewsCard from "../Single/ReviewsCard";
import saveIcon from "../../Assets/saveicon.png";
import savedIcon from "../../Assets/savedicon.png";
import Loader from "../Loaders/Loader";
import { BASE_URL } from "../../Context/AuthContext";

function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [relatedEvents, setRelatedEvents] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredImage, setHoveredImage] = useState(null);
  const [savedEvents, setSavedEvents] = useState([]);

  useEffect(() => {
    fetch(`https://aguero.pythonanywhere.com/event/${id}`)
      .then((res) => res.json())
      .then((data) => setEvent(data));

    fetch("https://aguero.pythonanywhere.com/event/")
      .then((res) => res.json())
      .then((data) => {
        // Exclude the current event
        const related = data.filter((event) => event.id !== parseInt(id));
        // Limit the number of related products to display
        const limitedRelated = related.slice(0, 20);
        setRelatedEvents(limitedRelated);
      });
    fetch(
      "https://random-data-api.com/api/v3/projects/e657498e-1ee1-4ec6-a8ed-ecfef7f0cc48?api_key=HF9K2pVV3eyFg790PkXc0w"
    )
      .then((response) => response.json())
      .then((data) => setReviews(data.json_array));
  }, [id]);

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

  const isSaved = (eventId) => savedEvents.includes(eventId);

  if (!event) {
    return <Loader />;
  }

  return (
    <div>
      <div className="p-8">
        <div className="flex mr-40 ml-40 mt-20 mb-20 justify-items-center">
          <div className="">
            <img
              src="https://pic.pnnet.dev/300x300"
              alt="img"
              className="w-full h-[500px] object-contain"
            />
          </div>
          <div className="w-1/2 pl-8 ml-20">
            <h3 className="text-xl font-ubuntu mb-0">{event.title}</h3>
            {reviews.length > 6 && (
              <p className="text-[#3C9B78] text-sm font-light mb-16">
                {reviews[6].userName}
              </p>
            )}

            <p className="text-[#222831] text-2xl font-bold mb-4">
              Date:
              {event.event_date}
            </p>
            <div className="description-wrapper w-110">
              <p className="text-sm font-light mb-8">
                Description: {event.description}
              </p>
            </div>
            <p className="text-xl font-bold mb-1">
              Location: {event.event_place}
            </p>
            <p className="text-l text-[#11875C] font-bold mb-14">
              Time: {event.event_time}
            </p>
            <div className="flex">
              <button className="bg-orange-400 hover:bg-orange-500 text-black font-bold py-4 px-10 rounded-xl ml-2 flex items-center">
                <BookmarkSimple size={24} />
                <span className="ml-2">Save</span>
              </button>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-20">
          <h2 className="text-gray-400 text-3xl font-ubuntu font-bold mb-1">
            Reviews
          </h2>
          <div className="flex overflow-x-scroll">
            {reviews.map((review, index) => (
              <ReviewsCard
                key={index}
                userName={review.userName}
                rating={review.rating}
                review={review.review}
              />
            ))}
          </div>
        </div>

        {/* Related Section */}
        <div className="mt-20 ">
          <h2 className="text-gray-400 text-3xl font-ubuntu font-bold mb-1">
            Related Events
          </h2>
          <div className="flex flex-wrap justify-center space-x-6 relative mt-4">
            {relatedEvents.map((relatedEvent) => (
              <Link
                to={`/Events/details/${relatedEvent.id}`}
                key={relatedEvent.id}
              >
                <div
                  key={relatedEvent.id}
                  className="w-64 rounded-xl p-2 mb-4 relative hover:scale-110 hover:opacity-90 transition duration-300 ease-in-out cursor-pointer shadow-lg"
                  onMouseEnter={() => handleMouseEnter(relatedEvent.id)}
                  onMouseLeave={handleMouseLeave}
                  style={{
                    backgroundColor:
                      isHovered && hoveredImage === relatedEvent.id
                        ? "#E5E7EB"
                        : "white",
                  }}
                >
                  <div className="flex flex-col items-center relative">
                    <div className="w-64 h-64 overflow-hidden mb-2 relative rounded-lg">
                      <img
                        src={`${BASE_URL}${relatedEvent.image}`}
                        alt={relatedEvent.title}
                        className="w-full h-full object-cover rounded-lg"
                      />

                      {isHovered && hoveredImage === relatedEvent.id && (
                        <img
                          src={isSaved(relatedEvent.id) ? savedIcon : saveIcon}
                          alt="Save"
                          style={saveIconStyle}
                          onClick={() => toggleSaved(relatedEvent.id)}
                        />
                      )}
                    </div>
                    <p className="text-center mt-2 max-h-16 overflow-hidden whitespace-normal font-bold">
                      {relatedEvent.title}
                    </p>
                    <p className="text-gray-600">
                      {" "}
                      Organizer:{relatedEvent.organizer}{" "}
                    </p>
                    <p className="text-gray-600 text-center">
                      {relatedEvent.event_date}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventDetails;
