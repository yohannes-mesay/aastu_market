import React from 'react';
import PropTypes from 'prop-types';
import { Star } from "phosphor-react";
import StaticStar from '../Rating/StaticStar';

function ReviewsCard({userName, rating, review }) {
  return (
    <div className="flex-none w-96 p-4 m-2 bg-[#F3F3F3] rounded-xl">
      <h3 className="text-[#3C9B78] text-sm font-light mb-4">{userName}</h3>
      <div className="flex mb-2">
        <StaticStar size={24} rated={rating} />
      </div>  
      <p className="text-sm text-[#828282]">{review}</p>
    </div>
  );
}

ReviewsCard.propTypes = {
    userName: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    review: PropTypes.string.isRequired,
};

export default ReviewsCard;