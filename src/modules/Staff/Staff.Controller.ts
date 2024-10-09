import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import staff from "./Staff.server";



export const all = async (req: Request, res: Response) => {
  try {
    const data = await staff.findAll();
    if (!data) {
      return res.status(404).json({ message: "No Staff found" });
    }
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred", error: err });
  }
};


export const one = async (req: Request, res: Response) => {
  try {
    const data = await staff.findOne(req.params.id);
    if (!data) {
      return res.status(404).json({ message: "staff not found" });
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
    req.user = decoded
    if (decoded) {
      let { name, role, phoneNumber,userId } = req.body;
      const three = await staff.findOneOne(req.user.id)
      if (three) {
        return res.status(409).json({ message: "Staff Already Exist" });
      }
      const four = await staff.AllCreates({
        name: name,
        phoneNumber: phoneNumber,
        role: role,
        userId: req.user.id
      });
      res.status(201).json(four);
    }

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred" });
  }
};


export const update = async (req: Request, res: Response) => {
  try {
    let { name, phoneNumber, role } = req.body;
    const { id } = req.params;

    const data = await staff.findOne(id);
    if (!data) {
      return res.status(404).json({ message: "Staff not found" });
    }

    const updated = await staff.Update(
      { name, phoneNumber, role },
      { where: { id } }
    );

    if (!updated) {
      return res.status(400).json({ message: "Failed to update event" });
    }

    res.status(200).json({ message: "Staff updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred while updating the event", error: err });
  }
};


export const destroy = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const eventToDelete = await staff.findOne(id);
    if (!eventToDelete) {
      return res.status(404).json({ message: "staff not found" });
    }

    const deleted = await staff.Destroy({ where: { id } });

    if (!deleted) {
      return res.status(400).json({ message: "Failed to delete event" });
    }

    res.status(200).json({ message: "Staff deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred", error: err });
  }
};

export const allStaff = async (req: any, res: Response) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized, token not provided" });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || "secret");
    req.user = decoded
    let user = await staff.findOneUser(req.user.id)
    if (!user) {
      return res.status(401).json({ message: "No User found" })
    }
    let Staff = await staff.findOneStaff(req.user.id)
    if (!Staff) {
      return res.status(401).json({ message: "NO DATA AVAILABLE" })
    }
    res.status(201).json({ user, Staff });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred", error: err });
  }
};
