import express from "express";
import {
  getAllTenders,
  getTenderById,
} from "../controllers/tenderController.js";

const viewTenderRoute = express.Router();

viewTenderRoute.get("/", getAllTenders);
viewTenderRoute.get("/:id", getTenderById); // Not used anywhere
export default viewTenderRoute;
