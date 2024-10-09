import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import patient from "./Patient.server";
import { sendEmail } from "./Patient.email";



export const all = async (req: Request, res: Response) => {
  try {
    const data = await patient.findAll();
    if (!data) {
      return res.status(404).json({ message: "No Patient found" });
    }
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred", error: err });
  }
};


export const one = async (req: Request, res: Response) => {
  try {
    const data = await patient.findOne(req.params.id);
    if (!data) {
      return res.status(404).json({ message: "Patient not found" });
    }
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred", error: err });
  }
};


export const add = async (req:any, res: Response) => {
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
      const { name, phoneNumber} = req.body;
 

      const existingDoctor = await patient.findOneOne(req.user.id);
      if (existingDoctor) {
        return res.status(409).json({ message: "Patient Already Exists" });
      }
    

      // Create new doctor entry
      const newDoctor = await patient.AllCreates({
        name,
        phoneNumber,
        userId: req.user.id
      });
      

      if (decoded.email)  
       {
        const subject = `Welcome to the Registration for Patient ${newDoctor.name}`;
        const text = `You have successfully registered as a Patient.\n
          PhoneNumber: ${newDoctor.phoneNumber}\n
          `;

    
        try {
          await sendEmail(decoded.email, subject, text);
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
    let { name, phoneNumber} = req.body;
    const { id } = req.params;

    const data = await patient.findOne(id);
    if (!data) {
      return res.status(404).json({ message: "Patient not found" });
    }

    const updated = await patient.Update(
      { name, phoneNumber},
      { where: { id } }
    );

    if (!updated) {
      return res.status(400).json({ message: "Failed to update event" });
    }

    res.status(200).json({ message: "Patient updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred while updating the event", error: err });
  }
};


export const destroy = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const eventToDelete = await patient.findOne(id);
    if (!eventToDelete) {
      return res.status(404).json({ message: "Patient not found" });
    }

    const deleted = await patient.Destroy({ where: { id } });

    if (!deleted) {
      return res.status(400).json({ message: "Failed to delete event" });
    }

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred", error: err });
  }
};

export const allPatient = async (req: any, res: Response) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized, token not provided" });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || "secret");
    req.user = decoded
       let User = await patient.findOneUser(req.user.id)
       if(!User){
        return res.status(401).json({message:"No User found"})
      }
        let Patient = await patient.findOnePatient(req.user.id)
      if(!Patient){
        return res.status(401).json({message:"NO DATA AVAILABLE"})
      }

      let Diagnosis = await patient.findOneDiagnosis(req.user.id)
      if(!Diagnosis){
        return res.status(401).json({message:"NO DATA AVAILABLE"})
      }

      let Payment = await patient.findOnePayment(req.user.id)
      if(!Payment){
        return res.status(401).json({message:"NO DATA AVAILABLE"})
      }
      res.status(201).json({User,Patient,Diagnosis,Payment});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred", error: err });
  }
};