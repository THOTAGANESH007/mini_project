import express from "express";
import upload from "../middlewares/multer.js";
import {
  getAllPlaces,
  getPlaceById,
  createPlace,
  updatePlace,
  deletePlace,
  getPlaceByCategory,
} from "../controllers/placeController.js";

const placesRouter = express.Router();

// Routes
placesRouter.get("/", getAllPlaces);
placesRouter.get("/:id", getPlaceById);
placesRouter.get("/category/:category", getPlaceByCategory);
placesRouter.post("/", upload.single("image"), createPlace);
placesRouter.put("/:id", upload.single("image"),updatePlace);
placesRouter.delete("/:id", deletePlace);

export default placesRouter;
