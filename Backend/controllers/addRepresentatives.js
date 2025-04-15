import RepresentativeModel from "../models/Representative.js";
import uploadImageCloudinary from "../utils/uploadImageCloudinary.js";

export const createRepresentative = async (req, res) => {
  try {
    const {
      name,
      designation,
      phoneNo,
      email,
      office_address,
      region_or_area,
    } = req.body;

    const image = req.file;

    if (!image) {
      return res.status(400).json({
        message: "No image uploaded",
        error: true,
        success: false,
      });
    }

    const upload = await uploadImageCloudinary(image);

    const newRep = new RepresentativeModel({
      name,
      designation,
      phoneNo,
      email,
      photo_url: upload.url,
      office_address,
      region_or_area,
    });

    const savedRep = await newRep.save();

    res.status(201).json({
      message: "Representative created successfully",
      data: {
        image_url: upload.url,
        representative: savedRep,
      },
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
      error: true,
      success: false,
    });
  }
};
