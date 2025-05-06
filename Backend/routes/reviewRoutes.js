import express from "express";
import {
  createReview,
  getReviewsByPlace,
} from "../controllers/reviewController.js";
import auth from "../middlewares/auth.js";

const reviewRoute = express.Router();

reviewRoute.post("/:placeId", auth, createReview);
reviewRoute.get("/:placeId", getReviewsByPlace);

export default reviewRoute;
