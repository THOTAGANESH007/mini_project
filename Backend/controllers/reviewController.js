import ReviewModel from "../models/Review.js";
import { updatePlaceRating } from "../utils/updatePlaceRating.js";

// Create or Update review
export const createOrUpdateReview = async (req, res) => {
  try {
    const userId = req.user._id;
    const { rating, review } = req.body;
    const placeId = req.params;
    let existingReview = await ReviewModel.findOne({ userId, placeId });

    if (existingReview) {
      existingReview.rating = rating;
      existingReview.review = review;
      await existingReview.save();
      await updatePlaceRating(placeId);
      return res
        .status(200)
        .json({ message: "Review updated", review: existingReview });
    }

    const newReview = new ReviewModel({ userId, placeId, rating, review });
    await newReview.save();
    await updatePlaceRating(placeId);

    res.status(201).json({ message: "Review created", review: newReview });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all reviews for a place
export const getReviewsByPlace = async (req, res) => {
  try {
    const reviews = await ReviewModel.find({
      placeId: req.params.placeId,
    }).populate("userId");
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
