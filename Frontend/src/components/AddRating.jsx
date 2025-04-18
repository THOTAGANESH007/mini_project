import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";

const AddRating = () => {
  const { id } = useParams();
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0 || review.trim() === "") return;

    try {
      setSubmitting(true);
      const res=await axios.post(`http://localhost:9999/api/reviews/${id}`, {
        rating,
        review,
      },{withCredentials:true});
      console.log(res)
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      setReview("");
      setRating(0);
    } catch (error) {
      console.error("Submission failed", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-6 mt-10">
      <h2 className="text-2xl font-semibold mb-4 text-center">Leave a Review</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex px-4 mb-4">Rating:
          <Stack spacing={1}>
            <Rating
              name="user-rating size-medium"
              value={rating}
              
              size="large"
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
            />
          </Stack>
        </div>

        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Write your review..."
          className="textarea textarea-bordered w-full h-32 resize-none mb-4"
        ></textarea>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all duration-200"
        >
          {submitting ? "Submitting..." : "Submit Review"}
        </button>

        {success && (
          <p className="text-green-600 mt-3 text-center">
            Review submitted successfully!
          </p>
        )}
      </form>
    </div>
  );
};

export default AddRating;
