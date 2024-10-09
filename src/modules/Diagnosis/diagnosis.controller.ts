import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import diagnosis from "./diagnosis.server";


export const all = async (req: Request, res: Response) => {
  try {
    const data = await diagnosis.findAll();
    if (!data) {
      return res.status(404).json({ message: "No Diagnosis found" });
    }
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred", error: err });
  }
};


export const one = async (req: Request, res: Response) => {
  try {
    const data = await diagnosis.findOne(req.params.id);
    if (!data) {
      return res.status(404).json({ message: "Diagnosis not found" });
    }
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred", error: err });
  }
};


export const add = async (req: any, res: Response,imagePath:any) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized, token not provided" });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || "secret");
    req.user = decoded
    if (decoded) {
      let { image,appointmentId} = req.body;
      if(req.file){
        imagePath=req.file.path
      }
      const one = await diagnosis.findOneAppointment(appointmentId)
      if(!one){
        return res.status(404).json({ message: "Appointment not found" });
      }
      const data = await diagnosis.Create({
         image:imagePath,
         appointmentId:appointmentId,
         userId:req.user.id
      });

      res.status(201).json(data);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred", error: err });
  }
};


export const update = async (req: Request, res: Response,imagePath:any) => {
  try {
    let { image,appointmentId} = req.body;
    const { id } = req.params;

    const data = await diagnosis.findOne(id);
    if (!data) {
      return res.status(404).json({ message: "diagnosis not found" });
    }

    const one = await diagnosis.findOneAppointment(appointmentId)
      if(!one){
        return res.status(404).json({ message: "Appointment not found" });
      }
      if(req.file){
        imagePath=req.file.path
      }

    const updated = await diagnosis.Update(
      { image:imagePath,appointmentId},
      { where: { id } }
    );

    if (!updated) {
      return res.status(400).json({ message: "Failed to update event" });
    }

    res.status(200).json({ message: "Department updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred while updating the event", error: err });
  }
};


export const destroy = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const eventToDelete = await diagnosis.findOne(id);
    if (!eventToDelete) {
      return res.status(404).json({ message: "Diagnosis not found" });
    }

    const deleted = await diagnosis.Destroy({ where: { id } });

    if (!deleted) {
      return res.status(400).json({ message: "Failed to delete event" });
    }

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred", error: err });
  }
};

