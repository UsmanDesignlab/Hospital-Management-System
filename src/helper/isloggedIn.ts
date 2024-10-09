import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';



export async function isLoggedIn(req:any, res: Response, next: NextFunction) {
  if (!req.cookies.token) {
    return res.status(401).send("You are not logged in");
  }
  try {
    const data: any = jwt.verify(req.cookies.token, "secret");
    req.user = data; 
    // This sets the user data, including role
    
    next();
  } catch (err) {
    return res.status(401).send("Invalid token");
  }
}



export function isAdmin(req: any, res: Response, next: NextFunction) {
  if (!req.user || req.user.role !== 'Admin') {
    return res.status(403).send("Forbidden: Admins only");
  }
  next();
}

export function isStaff(req: any, res: Response, next: NextFunction) {
  if (!req.user || req.user.role !== 'Staff') {
    return res.status(403).send("Forbidden: Staff only");
  }
  next();
}

export function isDoctor(req: any, res: Response, next: NextFunction) {
  if (!req.user || req.user.role !== 'Doctor') {
    return res.status(403).send("Forbidden: Doctor only");
  }
  next();
}

export function isPatient(req: any, res: Response, next: NextFunction) {
  if (!req.user || req.user.role !== 'Patient') {
    return res.status(403).send("Forbidden: Patient only");
  }
  next();
}
