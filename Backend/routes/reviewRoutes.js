import express from "express";
import {
  createOrUpdateReview,
  getReviewsByPlace,
} from "../controllers/reviewController.js";
import auth from "../middlewares/auth.js";

const reviewRoute = express.Router();

reviewRoute.post("/:placeId", auth, createOrUpdateReview);
reviewRoute.get("/:placeId", auth, getReviewsByPlace);

export default reviewRoute;
