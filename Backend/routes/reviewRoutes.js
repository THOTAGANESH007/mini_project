import express from "express";
import {
  createOrUpdateReview,
  getReviewsByPlace,
} from "../controllers/reviewController.js";

const reviewRoute = express.Router();

reviewRoute.post("/", createOrUpdateReview);
reviewRoute.get("/:placeId", getReviewsByPlace);

export default reviewRoute;
