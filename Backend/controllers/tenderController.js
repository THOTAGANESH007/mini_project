import axios from "axios";
import TenderModel from "../models/Tender.js";

// POST: Create a new tender
export const createTender = async (req, res) => {
  const {
    title,
    description,
    category,
    opening_date,
    deadline,
    uuid, // UUID from frontend to get file metadata
    fileUrl, // Optional, in case UUID is not used
  } = req.body;

  if (!uuid && !fileUrl) {
    return res.status(400).json({ error: "fileUrl or uuid is required" });
  }

  try {
    let metadata;

    // If uuid is provided, fetch file metadata from Uploadcare
    if (uuid) {
      const response = await axios.get(
        `https://api.uploadcare.com/files/${uuid}/`,
        {
          headers: {
            Accept: "application/vnd.uploadcare-v0.5+json",
            Authorization: `Uploadcare.Simple ${process.env.UPLOADCARE_PUBLIC_KEY}:${process.env.UPLOADCARE_SECRET_KEY}`,
          },
        }
      );

      if (response.status !== 200) {
        throw new Error("Failed to fetch file metadata from Uploadcare");
      }

      metadata = response.data;
    } else {
      // If fileUrl is provided, use it directly
      metadata = {
        cdn_url: fileUrl,
        original_filename: fileUrl.split("/").pop(),
      };
    }

    const pdf_link = metadata.original_file_url || metadata.cdn_url;
    if (!pdf_link) {
      return res
        .status(500)
        .json({ error: "Failed to retrieve valid file URL" });
    }

    const newTender = new TenderModel({
      title,
      description,
      category,
      opening_date,
      deadline,
      pdf_link, // Save the pdf link here
    });

    await newTender.save();
    res.status(201).json({ success: true, tender: newTender });
  } catch (err) {
    console.error("Error uploading tender:", err.message);
    res.status(500).json({ error: "Tender upload failed" });
  }
};

// GET: Retrieve all tenders
export const getAllTenders = async (req, res) => {
  try {
    const tenders = await TenderModel.find().sort({ opening_date: -1 });
    res.json(tenders);
  } catch (err) {
    console.error("Error fetching tenders:", err.message);
    res.status(500).json({ error: "Failed to fetch tenders" });
  }
};

// GET: Get tender by ID
export const getTenderById = async (req, res) => {
  try {
    const tender = await TenderModel.findById(req.params.id);

    if (!tender) {
      return res.status(404).json({ error: "Tender not found" });
    }

    res.json(tender);
  } catch (err) {
    console.error("Error fetching tender by ID:", err.message);
    res.status(500).json({ error: "Failed to fetch tender" });
  }
};

// DELETE: Delete tender by ID
export const deleteTender = async (req, res) => {
  try {
    const tender = await TenderModel.findByIdAndDelete(req.params.id);

    if (!tender) {
      return res.status(404).json({ error: "Tender not found" });
    }

    res.json({ success: true, message: "Tender deleted successfully" });
  } catch (err) {
    console.error("Error deleting tender:", err.message);
    res.status(500).json({ error: "Failed to delete tender" });
  }
};
