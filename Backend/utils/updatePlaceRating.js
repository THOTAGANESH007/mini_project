import ReviewModel from "../models/Review.js";
import PlaceModel from "../models/Place.js";

export const updatePlaceRating = async (placeId) => {
  const reviews = await ReviewModel.find({ placeId });

  const reviewCount = reviews.length;
  const totalRating = reviews.reduce((sum, r) => sum + r.rating, 0);
  const averageRating =
    reviewCount > 0 ? (totalRating / reviewCount).toFixed(1) : 0;

  await PlaceModel.findByIdAndUpdate(placeId, {
    rating: averageRating,
    reviewCount,
  });
};
