import express from "express";
import upload from "../middlewares/multer.js";
import { createRepresentative } from "../controllers/addRepresentatives.js";

const representative = express.Router();

representative.post("/", upload.single("photo"), createRepresentative);

export default representative;
