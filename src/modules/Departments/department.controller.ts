import { Request, Response } from "express";
import department from "./department.server";
import jwt from 'jsonwebtoken';



export const all = async (req: Request, res: Response) => {
  try {
    const data = await department.findAllDepartments();
    if (!data) {
      return res.status(404).json({ message: "No Departments found" });
    }
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred", error: err });
  }
};


export const one = async (req: Request, res: Response) => {
  try {
    const data = await department.findOneDepartment(req.params.id);
    if (!data) {
      return res.status(404).json({ message: "Department not found" });
    }
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred", error: err });
  }
};


export const add = async (req: any, res: Response) => {
  try {
      let { departmentName, doctorsAvailable} = req.body;
      const data = await department.findOneCreate({
         departmentName:departmentName,
         doctorsAvailable:doctorsAvailable,
         userId:req.user.id
      });

      res.status(201).json(data);
    }
   catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred", error: err });
  }}


export const update = async (req: Request, res: Response) => {
  try {
    const { departmentName,doctorsAvailable} = req.body;
    const { id } = req.params;

    const data = await department.findOneDepartment(id);
    if (!data) {
      return res.status(404).json({ message: "Department not found" });
    }

    const updated = await department.findUpdate(
      { departmentName,doctorsAvailable},
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

    const eventToDelete = await department.findOneDepartment(id);
    if (!eventToDelete) {
      return res.status(404).json({ message: "Event not found" });
    }

    const deleted = await department.find_destroy({ where: { id } });

    if (!deleted) {
      return res.status(400).json({ message: "Failed to delete event" });
    }

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred", error: err });
  }
};


export const allAdmin = async (req: any, res: Response) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized, token not provided" });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || "secret");
    req.user = decoded
       let one = await department.findOneUser(req.user.id)
       if(!one){
        return res.status(401).json({message:"No User found"})
      }
        let data = await department.findAllDepartment(req.user.id)
      if(!data){
        return res.status(401).json({message:"NO DATA AVAILABLE"})
      }
      res.status(201).json({one,data});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred", error: err });
  }
};