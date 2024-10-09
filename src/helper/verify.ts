import {Request,Response,NextFunction} from "express"
import jwt from "jsonwebtoken"


export function verify (req: any, res: Response){
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized, token not provided" });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || "secret");
    req.user = decoded
    }
  catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred", error: err });
  }
}

