import ReviewModel from "../models/Review.js";
import { updatePlaceRating } from "../utils/updatePlaceRating.js";

// Create or Update review

import PlaceModel from "../models/Place.js";
import mongoose from "mongoose";


export const createReview = async (req, res) => {
  try {
    const userId = req.userId;
    const { rating, review } = req.body;
    const placeId = req.params.placeId;

    if (!mongoose.Types.ObjectId.isValid(placeId)) {
      return res.status(400).json({ error: "Invalid place ID" });
    }

    let existingReview = await ReviewModel.findOne({ userId, placeId });

    if (existingReview) {
      existingReview.rating = rating;
      existingReview.review = review;
      await existingReview.save();

      await updatePlaceRating(placeId);
      return res.status(200).json({ message: "Review updated", review: existingReview });
    }

    const newReview = new ReviewModel({ userId, placeId, rating, review });
    await newReview.save();

    // Push review ID into the Place document's reviews array
    await PlaceModel.findByIdAndUpdate(placeId, {
      $push: { reviews: newReview._id }
    });

    await updatePlaceRating(placeId);

    res.status(201).json({ message: "Review created", review: newReview });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};


// Get all reviews for a place
export const getReviewsByPlace = async (req, res) => {
  try {
    const reviews = await ReviewModel.find({ placeId: req.params.placeId })
      .populate("userId", "name profile") // Only populate name and profile
      .sort({ createdAt: -1 }); // Optional: newest first

    const data = reviews.map((r) => ({
      name: r.userId.name,
      profile: r.userId.profile,
      rating: r.rating,
      review: r.review,
      createdAt: r.createdAt,
    }));

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

