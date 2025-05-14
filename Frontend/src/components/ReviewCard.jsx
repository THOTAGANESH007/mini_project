import React from "react";
import Rating from "@mui/material/Rating";

// Helper to format date
const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const ReviewCard = ({ review }) => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-4 w-full max-w-md mx-auto mt-5 mb-5">
      {/* Profile and Name */}
      <div className="flex items-center gap-3">
        <img
          src={review.profile}
          alt={review.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <h3 className="text-base font-semibold">{review.name}</h3>
      </div>

      {/* Spacer */}
      <div className="mt-4" />

      {/* Rating and Date */}
      <div className="flex items-center justify-between">
        <Rating
          name="read-only"
          value={review.rating}
          precision={0.5}
          readOnly
          size="small"
        />
        <span className="text-xs text-gray-500">
          {formatDate(review.createdAt)}
        </span>
      </div>

      {/* Spacer */}
      <div className="mt-4" />

      {/* Review Text */}
      <p className="text-sm text-gray-700">{review.review}</p>
    </div>
  );
};

export default ReviewCard;
