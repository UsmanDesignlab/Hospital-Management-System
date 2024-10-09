import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import payment from "./Payment.server";


export const all = async (req: Request, res: Response) => {
  try {
    const data = await payment.findAll();
    if (!data) {
      return res.status(404).json({ message: "No Record found" });
    }
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred", error: err });
  }
};


export const one = async (req: Request, res: Response) => {
  try {
    const data = await payment.findOne(req.params.id);
    if (!data) {
      return res.status(404).json({ message: "Payment not found" });
    }
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred", error: err });
  }
};


// export const add = async (req: any, res: Response) => {
//   try {
//     const token = req.cookies.token;
//     if (!token) {
//       return res.status(401).json({ message: "Unauthorized, token not provided" });
//     }

//     const decoded: any = jwt.verify(token, process.env.JWT_SECRET || "secret");
//     req.user = decoded
//     if (decoded) {
//       let { name, checkingDate, amount, appointmentId } = req.body;

//       const one = await payment.findOneAppointment(appointmentId)
//       if (!one) {
//         return res.status(404).json({ message: "Appointment not found" });
//       }
//       const data = await payment.AllCreates({
//         name: name,
//         checkingDate: checkingDate,
//         amount: amount,
//         appointmentId: appointmentId,
//         userId: req.user.id
//       });

//       res.status(201).json(data);
//     }
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "An error occurred", error: err });
//   }
// };


export const update = async (req: Request, res: Response) => {
  try {
    let { name, checkingDate, amount, appointmentId } = req.body;
    const { id } = req.params;

    const data = await payment.findOne(id);
    if (!data) {
      return res.status(404).json({ message: "Payment not found" });
    }

    const one = await payment.findOneAppointment(appointmentId)
    if (!one) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    const updated = await payment.Update(
      { name, checkingDate, amount, appointmentId },
      { where: { id } }
    );

    if (!updated) {
      return res.status(400).json({ message: "Failed to update event" });
    }

    res.status(200).json({ message: "Amount updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred while updating the event", error: err });
  }
};


export const destroy = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const eventToDelete = await payment.findOne(id);
    if (!eventToDelete) {
      return res.status(404).json({ message: "Payment not found" });
    }

    const deleted = await payment.Destroy({ where: { id } });

    if (!deleted) {
      return res.status(400).json({ message: "Payment to delete event" });
    }

    res.status(200).json({ message: "Payment deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred", error: err });
  }
};
