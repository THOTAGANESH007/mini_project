import RepresentativeModel from "../models/Representative.js";
import uploadImageCloudinary from "../utils/uploadImageCloudinary.js";

export const createRepresentative = async (req, res) => {
  try {
    const { name, designation, phoneNumber, email, officeAddress } = req.body;

    const photo = req.file;

    if (!photo) {
      return res.status(400).json({
        message: "No image uploaded",
        error: true,
        success: false,
      });
    }

    const upload = await uploadImageCloudinary(photo);

    const newRep = new RepresentativeModel({
      name,
      designation,
      phoneNumber,
      email,
      photoUrl: upload.url,
      officeAddress,
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
