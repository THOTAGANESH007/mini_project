import express from "express";
import upload from "../middlewares/multer.js";
import { createRepresentative,viewRepresentatives } from "../controllers/addRepresentatives.js";
import auth from "../middlewares/auth.js";

const representative = express.Router();

representative.post("/add", upload.single("photo"),auth, createRepresentative);
representative.get("/view",viewRepresentatives);
export default representative;
