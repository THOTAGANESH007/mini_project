import PlaceModel from "../models/Place.js";
import uploadImageCloudinary from "../utils/uploadImageCloudinary.js";

// GET all places
export const getAllPlaces = async (req, res) => {
  try {
    const places = await PlaceModel.find();
    res.json(places);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch places" });
  }
};

// GET a single place by ID
export const getPlaceById = async (req, res) => {
  try {
    const place = await PlaceModel.findById(req.params.id);
    if (!place) return res.status(404).json({ error: "Place not found" });
    res.json(place);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch place" });
  }
};

// POST create a new place
export const createPlace = async (req, res) => {
  try {
    const { name, location, description, category, rating } = req.body;
    const image = req.file;

    if (!image) {
      return res.status(400).json({
        message: "No image uploaded",
        error: true,
        success: false,
      });
    }

    const upload = await uploadImageCloudinary(image);
    const payload = {
      name,
      location,
      description,
      category,
      imageUrl: upload.url,
      rating: Number(rating),
    };

    const place = new PlaceModel(payload);
    const save = await place.save();

    return res.json({
      message: "Uploaded the details of the place",
      data: {
        imageUrl: upload.url,
        newplace: save,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      error: true,
      success: false,
    });
  }
};


// PUT update a place
export const updatePlace = async (req, res) => {
  try {
    const { name, location, description, category, rating } = req.body;
    const image = req.file;

    let payload = {
      name,
      location,
      description,
      category,
      rating: Number(rating),
    };

    if (image) {
      const upload = await uploadImageCloudinary(image);
      payload.imageUrl = upload.url; // Keeping consistent with createPlace
    }

    const updatedPlace = await PlaceModel.findByIdAndUpdate(
      req.params.id,
      payload,
      { new: true, runValidators: true }
    );

    if (!updatedPlace) {
      return res.status(404).json({
        message: "Place not found",
        error: true,
        success: false,
      });
    }

    return res.json({
      message: "Place updated successfully",
      data: updatedPlace,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      error: true,
      success: false,
    });
  }
};


// DELETE a place
export const deletePlace = async (req, res) => {
  try {
    const deletedPlace = await PlaceModel.findByIdAndDelete(req.params.id);
    if (!deletedPlace)
      return res.status(404).json({ error: "Place not found" });
    res.json({ message: "Place deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete place" });
  }
};

export const getPlaceByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    
    if(category==="All"){
      const allPlaces = await PlaceModel.find();
      if (!allPlaces)
        return res.status(404).json({ error: "Place not found" });
    
      return res.json({ message: `All places is here`, data: allPlaces });
    }
    const categoryPlaces = await PlaceModel.find({category});
    if (!categoryPlaces)
      return res.status(404).json({ error: "Place not found" });
    
    res.json({ message: `${category} places is here`, data: categoryPlaces });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch category place" });
  }
};
