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
    uuid,
    fileUrl,
  } = req.body;

  if (!uuid && !fileUrl) {
    return res.status(400).json({ error: "fileUrl or uuid is required" });
  }

  try {
    let metadata;

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
      metadata = response.data;
    } else {
      metadata = {
        cdn_url: fileUrl,
        original_filename: fileUrl.split("/").pop(),
      };
    }

    const newTender = new TenderModel({
      title,
      description,
      category,
      opening_date,
      deadline,
      pdf_link: metadata.original_file_url || metadata.cdn_url,
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
