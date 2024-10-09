import express from "express";
import {changePassword,loginRegister ,userRegister,userLogout,verifyEmail } from "./User.controller";



const router = express.Router({ mergeParams: true });

router.post("/register",userRegister)
router.post('/verifyEmail', verifyEmail);
router.post("/logout",userLogout)
router.post("/login",loginRegister)
router.post("/changePassword",changePassword)



export default router;
