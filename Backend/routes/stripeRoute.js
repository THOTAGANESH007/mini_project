import express from "express";
import Stripe from "stripe";
import dotenv from "dotenv";
import auth from "../middlewares/auth.js";
import validate from "../middlewares/validate.js";
import billSchema from '../validations/Bill.validation.js'
dotenv.config();
const stripeRouter = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

stripeRouter.post("/create-checkout-session", auth,validate(billSchema), async (req, res) => {
  //const userId = req.userId; // Assuming userId is set in the request object
  const userId = req.userId;
  console.log(" id:", req.userId);
  const {
    email,
    phone,
    bill_number,
    billType,
    total_amount,
    payment_method,
    dueDate,
  } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `${billType} Bill`,
            },
            unit_amount: total_amount * 100, // Stripe expects cents
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId,
        email,
        phone,
        bill_number,
        billType,
        payment_method,
        dueDate,
      },
      success_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/cancel",
    });

    res.json({ id: session.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default stripeRouter;
