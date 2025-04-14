import mongoose from "mongoose";

const CensusSchema = new mongoose.Schema({
  data: { type: Object, required: true },
  location: { type: String, required: true },
  population: { type: Number, required: true },
  workingAge: { type: Number, required: true },
  ageGroups: { type: Object, required: true },
  sexRatio: { type: Number, required: true },
});
const CensusModel = mongoose.model("Census", CensusSchema);
export default CensusModel;
