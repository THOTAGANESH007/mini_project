import express from "express";
import {
  createTender,
  deleteTender,
  getAllTenders,
  getTenderById,
} from "../controllers/tenderController.js";

const tenderRoute = express.Router();

tenderRoute.post("/", createTender);
tenderRoute.get("/", getAllTenders);
tenderRoute.get("/:id", getTenderById); // Not used anywhere
tenderRoute.delete("/:id", deleteTender);
export default tenderRoute;
