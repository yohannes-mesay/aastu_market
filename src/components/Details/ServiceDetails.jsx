import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Phone, BookmarkSimple, Star } from "phosphor-react";
import ReviewsCard from "../Single/ReviewsCard";
import saveIcon from "../../Assets/saveicon.png";
import savedIcon from "../../Assets/savedicon.png";
import StarRating from "../Rating/StarRating";
import { useProduct } from "../../Context/ProductContext";
import { useSaved } from "../../Context/SavedContext";
import { BASE_URL } from "../../Context/AuthContext";

function ServiceDetails() {
  const { id } = useParams();
  const { getReviews, getRatings, rater, reviewer } = useProduct();
  const { saveService } = useSaved();
  const [service, setService] = useState(null);
  const [relatedServices, setRelatedServices] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredImage, setHoveredImage] = useState(null);
  const [savedServices, setSavedServices] = useState([]);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [newUser, setNewUser] = useState(true);
  useEffect(() => {
    // Fetch service details
    fetch(`https://aguero.pythonanywhere.com/service/${id}`)
      .then((res) => res.json())
      .then((data) => setService(data));

    // Fetch related services
    fetch("https://aguero.pythonanywhere.com/service/")
      .then((res) => res.json())
      .then((data) => {
        const related = data.filter((service) => service.id !== parseInt(id));
        const limitedRelated = related.slice(0, 20);
        setRelatedServices(limitedRelated);
      });

    // Fetch reviews and ratings
    const fetchReviewsAndRatings = async () => {
      const reviewsResponse = await getReviews(id);
      const ratingsResponse = await getRatings(id);

      const combinedData = reviewsResponse.map((review) => {
        const correspondingRating = ratingsResponse.find(
          (rating) =>
            rating.user.first_name === review.user.first_name &&
            rating.user.last_name === review.user.last_name
        );
        return {
          id: review.id,
          userName: `${review.user.first_name} ${review.user.last_name}`,
          rating: correspondingRating ? correspondingRating.rate : 0,
          review: review.review,
        };
      });

      setReviews(combinedData);
    };

    fetchReviewsAndRatings();
  }, [id, getReviews, getRatings, newUser]);

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

  const isSaved = (serviceId) => savedServices.includes(serviceId);

  const handleRatingReview = (e) => {
    e.preventDefault();
    rater(id, rating);
    reviewer(id, review);
  };

  return (
    <div>
      {service ? (
        <div className="p-8">
          {/* Service Details */}
          <div className="flex mr-40 ml-40 mt-20 mb-20 justify-items-center">
            <div className="">
              <img
                src={`${BASE_URL}${service.image}`}
                alt={service.title}
                className="w-full h-[500px] object-contain"
              />
            </div>
            <div className="w-full sm:w-1/2 pl-8 ml-0 sm:ml-20">
              <h3 className="text-xl font-ubuntu mb-0">{service.title}</h3>
              <p className="text-[#3C9B78] text-sm font-light mb-16">
                {/* Displaying a review */}
                {reviews.length > 0 && reviews[0].userName}
              </p>
              <p className="text-[#222831] text-2xl font-bold mb-4">
                Rating: {service.rating}
              </p>
              <div className="description-wrapper w-110">
                <p className="text-sm font-light mb-4">
                  Description: {service.description}
                </p>
              </div>
              <div className="flex">
                {/* Buttons for calling and saving */}
                <button className="bg-orange-400 hover:bg-orange-500 text-black font-bold py-4 px-10 rounded-xl mr-2 flex items-center">
                  <Phone size={24} />
                  <span
                    onClick={() =>
                      alert(
                        `Phone.No: +251${Math.random() < 0.5 ? "7" : "9"}${
                          Math.floor(
                            Math.random() * (99999999 - 10000000 + 1)
                          ) + 10000000
                        }`
                      )
                    }
                    className="ml-2"
                  >
                    Call
                  </span>
                </button>
                <button
                  className="bg-orange-400 hover:bg-orange-500 text-black font-bold py-4 px-10 rounded-xl ml-2 flex items-center"
                  onClick={() => toggleSaved(service.id)}
                >
                  <BookmarkSimple size={24} />
                  <span className="ml-2">
                    {isSaved(service.id) ? "Saved" : "Save"}
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Rating Section */}
          <form onSubmit={handleRatingReview}>
            <div className="flex justify-center my-8">
              <div className="mr-40 flex flex-col justify-items-start">
                <h2 className="text-gray-400 text-3xl font-ubuntu font-bold mb-1 mt-8">
                  Rate this Service
                </h2>
                <p className="text-[#B0B0B0] text-l font-ubuntu">
                  Tell others what you think about this Service
                </p>
                <div className="flex m-10">
                  <StarRating size={60} onSetRating={setRating} />
                </div>
              </div>
              <div className="flex flex-col justify-end ml-40 mt-8">
                <textarea
                  onChange={(e) => setReview(e.target.value)}
                  className="border border-gray-300 rounded-md p-2 resize-y w-96 h-40"
                  placeholder="Leave your review"
                ></textarea>
                <button
                  onClick={() => setNewUser((n) => !n)}
                  className="bg-orange-400 hover:bg-orange-500 text-black font-bold py-2 px-4 rounded-xl mt-4 ml-56"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>

          {/* Reviews Section */}
          <div className="mt-20 overflow-x-auto scrollbar-none">
            <h2 className="text-gray-400 text-3xl font-ubuntu font-bold mb-1">
              Reviews
            </h2>
            <div className="flex">
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
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#2B9770]"></div>
        </div>
      )}
    </div>
  );
}

export default ServiceDetails;
