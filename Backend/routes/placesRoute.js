import express from "express";
import multer from "multer";
import upload from "../middlewares/multer.js";
import {
  getAllPlaces,
  getPlaceById,
  createPlace,
  updatePlace,
  deletePlace,
} from "../controllers/placeController.js";

const placesRouter = express.Router();

// Routes
placesRouter.get("/", getAllPlaces);
placesRouter.get("/:id", getPlaceById);
placesRouter.post("/", upload.single("image"), createPlace);
placesRouter.put("/:id", updatePlace);
placesRouter.delete("/:id", deletePlace);

export default placesRouter;
