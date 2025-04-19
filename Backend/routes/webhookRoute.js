import express from "express";
import Stripe from "stripe";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import BillModel from "../models/Bill.js";

dotenv.config();
const webhookRoute = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

webhookRoute.post(
  "/",
  bodyParser.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
      console.log("✅ Webhook received:", event.type);
    } catch (err) {
      console.error("❌ Webhook Error:", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const metadata = session.metadata;

      try {
        const bill = new BillModel({
          userId: metadata.userId,
          email: metadata.email,
          phone: metadata.phone,
          bill_number: metadata.bill_number,
          billType: metadata.billType,
          total_amount: session.amount_total / 100,
          payment_status: "Paid",
          payment_method: metadata.payment_method || "Other",
          dueDate: new Date(metadata.dueDate),
        });

        await bill.save();
        console.log("✅ Bill saved to DB");
      } catch (err) {
        console.error("❌ Error saving bill:", err.message);
      }
    }

    res.status(200).json({ received: true });
  }
);

export default webhookRoute;
