import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { toast, ToastContainer } from "react-toastify"; // Import Toastify & ToastContainer
import { CircularProgress } from "@mui/material";

const AddRating = () => {
  const { id } = useParams();
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Toastify setup

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation: Check if rating and review are valid
    if (rating === 0 || review.trim() === "") {
      toast.error("Please provide a rating and review!");
      return;
    }

    if (rating < 1 || rating > 5) {
      toast.error("Rating must be between 1 and 5!");
      return;
    }

    try {
      setSubmitting(true);
      const res = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/reviews/${id}`,
        {
          rating,
          review,
        },
        { withCredentials: true }
      );
      console.log(res);
      toast.success("Review submitted successfully!"); // Show success message
      setReview("");
      setRating(0);
    } catch (error) {
      console.error("Submission failed", error);
      toast.error("Failed to submit the review. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-6 mt-10">
      {/* ToastContainer for displaying toast messages */}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        pauseOnFocusLoss
      />
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Leave a Review
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="flex px-4 mb-4">
          Rating:
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
          {submitting ? (
            <CircularProgress
              className="mx-auto"
              color="inherit"
              thickness={5}
              size={25}
            />
          ) : (
            "Submit Review"
          )}
        </button>
      </form>
    </div>
  );
};

export default AddRating;
