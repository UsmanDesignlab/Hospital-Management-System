import express from 'express';
import methodOverride from 'method-override';
import cookieParser from 'cookie-parser';
import path from 'path';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import passport from 'passport';
import sequelize from './src/database/Index';
import Department from "./src/modules/Departments/department.routes"
import Appointment from "./src/modules/Appointment/Appointment.routes"
import Diagnosis from "./src/modules/Diagnosis/diagnosis.routes"
import Record from "./src/modules/MedicalRecord/Medical.routes"
import Doctor from "./src/modules/Doctor/Doctor.routes"
import Patient from "./src/modules/Patient/Patient.routes"
import Staff from "./src/modules/Staff/Staff.routes"
import Payment from "./src/modules/Payment/Payment.routes"
import User from "./src/modules/User/User.routes"
import { isAdmin, isDoctor, isPatient, isLoggedIn, isStaff } from "./src/helper/isLoggedIn"

dotenv.config({ path: './config.env' });

const limiter = rateLimit({
  max: 50,
  windowMs: 60 * 60 * 1000,
  message: 'Too many attempts. Please wait for one hour.',
});

const app = express();

// Middleware setup
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

// Apply rate limiter to all API routes
app.use('/api', limiter);
app.use("/api", User)
app.use("/api/department", isLoggedIn, Department)
app.use("/api/appointment", isLoggedIn, isPatient, Appointment)
app.use("/api/diagnosis", isLoggedIn, isPatient, Diagnosis)
app.use("/api/doctor", isLoggedIn, Doctor)
app.use("/api/record", isLoggedIn, isStaff, Record)
app.use("/api/patient", isLoggedIn, isPatient, Patient)
app.use("/api/staff", isLoggedIn, isStaff, Staff)
app.use("/api/payment", isLoggedIn, isPatient, Payment)



// Open route for testing
app.get('/', (req, res) => {
  res.send('App is Running');
});

sequelize.sync({ force: true });
console.log('All models were synchronized successfully.');

app.listen(process.env.PORT, () => {
  console.log(`App is running on port ${process.env.PORT}`);
});
