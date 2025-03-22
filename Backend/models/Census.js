const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const CensusSchema = new Schema({
  data: { type: Object, required: true },
  location: { type: String, required: true },
  population: { type: Number, required: true },
  workingAge: { type: Number, required: true },
  ageGroups: { type: Object, required: true },
  sexRatio: { type: Number, required: true },
});

module.exports = model("Census", CensusSchema);
