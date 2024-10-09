import { Request, Response } from "express";
import payment from "./Payment.server";
import Stripe from 'stripe';
import jwt from 'jsonwebtoken';
// import dotenv from 'dotenv';

// dotenv.config({ path: "./config.env" });

const stripe = new Stripe("sk_test_51Q6wiYRvxXVFFsCHqC10aLpm2SUx3rlHJ8HIh8h1SRO6YBS08a9lIh4FXhOIACPSzdmGCpetuC8JxiRUbGNFUrqM001nyTQpTo");


export const checkOut = async (req: any, res: Response) => {
  let { name, checkingDate, amount, appointmentId } = req.body;
  try {
    if (!appointmentId || !name || !checkingDate || !amount) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const session = await stripe.checkout.sessions.create({
      line_items: [{
        price_data: {
          currency: "usd",
          product_data: {
            name: "DOCTOR",
          },
          unit_amount: amount * 100, // Convert dollars to cents
        },
        quantity: 1
      }],
      mode: "payment",
      success_url: "http://localhost:4007/login",
      cancel_url: "http://localhost:4007/payment"
    });

    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized, token not provided" });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || "secret");
    req.user = decoded
    if (decoded) {

      const one = await payment.findOneAppointment(appointmentId)
      if (!one) {
        return res.status(404).json({ message: "Appointment not found" });
      }
      const data = await payment.AllCreates({
        name: name,
        checkingDate: checkingDate,
        amount: amount,
        appointmentId: appointmentId,
        userId: req.user.id
      });

      res.status(200).json({ url: session.url });
    }
  } catch (error) {
    console.error('Error during checkout session creation:', error);
    return res.status(500).json({ error: 'Error during checkout' });
  }
};