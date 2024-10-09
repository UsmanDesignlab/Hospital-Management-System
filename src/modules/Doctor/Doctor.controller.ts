import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import doctor from "./Doctor.server";
import { sendEmail } from "./Doctor.email";


export const all = async (req: Request, res: Response) => {
  try {
    const data = await doctor.findAll();
    if (!data) {
      return res.status(404).json({ message: "No Doctor found" });
    }
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred", error: err });
  }
};


export const one = async (req: Request, res: Response) => {
  try {
    const data = await doctor.findOne(req.params.id);
    if (!data) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred", error: err });
  }
};


export const add = async (req: any, res: Response) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized, token not provided" });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || "secret");
    console.log(decoded)
    req.user = decoded;
    console.log(req.user.email)



    if (decoded) {
      const { name, phoneNumber, date, capacity, specialization, available } = req.body;
      
    
      const existingDoctor = await doctor.findOneOne(req.user.id);
      if (existingDoctor) {
        return res.status(409).json({ message: "Doctor Already Exists" });
      }


      // Create new doctor entry
      const newDoctor = await doctor.AllCreates({
        name,
        phoneNumber,
        date,
        capacity,
        specialization,
        available,
        userId: req.user.id
      });


      if (decoded.email) {
        const subject = `Welcome to the Registration for Doctor ${newDoctor.name}`;
        const text = `You have successfully registered as a Doctor.\n
          Specialization: ${newDoctor.specialization}\n
          Date: ${newDoctor.date}\n
          Phone Number: ${newDoctor.phoneNumber}\n`;


        try {
          await sendEmail(decoded.email, subject, text);
          console.log(`Email sent to ${decoded.email}`);
        } catch (emailErr) {
          console.error('Failed to send email:', emailErr);
          return res.status(500).json({ message: "Failed to send email" });
        }
      } else {
        return res.status(400).json({ message: "User email is not available" });
      }

      // Return successful response
      return res.status(201).json(newDoctor);
    }

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "An error occurred", error: err });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    let { name, phoneNumber, date, capacity, specialization, available } = req.body;
    const { id } = req.params;

    const data = await doctor.findOne(id);
    if (!data) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const updated = await doctor.Update(
      { name, phoneNumber, date, capacity, specialization, available },
      { where: { id } }
    );

    if (!updated) {
      return res.status(400).json({ message: "Failed to update event" });
    }

    res.status(200).json({ message: "Doctor updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred while updating the event", error: err });
  }
};


export const destroy = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const eventToDelete = await doctor.findOne(id);
    if (!eventToDelete) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const deleted = await doctor.Destroy({ where: { id } });

    if (!deleted) {
      return res.status(400).json({ message: "Failed to delete event" });
    }

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred", error: err });
  }
};

export const allDoctor = async (req: any, res: Response) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized, token not provided" });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || "secret");
    req.user = decoded
    let user = await doctor.findOneUser(req.user.id)
    if (!user) {
      return res.status(401).json({ message: "No User found" })
    }
    let Doctor = await doctor.findAllDoctor(req.user.id)
    if (!Doctor) {
      return res.status(401).json({ message: "NO DATA AVAILABLE" })
    }
    res.status(201).json({ user, Doctor });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred", error: err });
  }
};
