import { Sequelize } from "sequelize-typescript";
import { Users } from "../modules/User/User.Model";
import { Staff } from "../modules/Staff/Staff.Model";
import { Patient } from "../modules/Patient/Patient.Model";
import { Doctor } from "../modules/Doctor/Doctor.Model";
import { Appointment } from "../modules/Appointment/Appointment.Model";
import { Record } from "../modules/MedicalRecord/Medical.Model";
import { Diagnosis } from "../modules/Diagnosis/diagnosis.model";
import { Payment } from "../modules/Payment/Payment.Model";
import { Department } from "../modules/Departments/department.model";

import dotenv from 'dotenv';

dotenv.config({ path: "./config.env" });

const sequelize = new Sequelize(process.env.db_NAME as string, process.env.db_USER as string, process.env.db_PASSWORD, {
  host: process.env.db_HOST,
  logging: false,
  dialect: 'mysql',
  models: [Users, Staff, Patient, Doctor, Appointment, Record, Diagnosis, Payment, Department]
});

Users.hasOne(Staff, { foreignKey: "userId" })
Users.hasOne(Doctor, { foreignKey: "userId" })
Users.hasOne(Patient, { foreignKey: "userId" })
Users.hasOne(Diagnosis, { foreignKey: "userId" })
Users.hasOne(Record, { foreignKey: "userId" })
Users.hasOne(Payment, { foreignKey: "userId" })
Users.hasOne(Department, { foreignKey: "userId" })
Doctor.hasMany(Patient, { foreignKey: "doctorId" })
Doctor.hasOne(Appointment, { foreignKey: "doctorId" })
Appointment.hasMany(Record, { foreignKey: "appointmentId" })
Patient.hasOne(Appointment, { foreignKey: "patientId" })
Appointment.hasMany(Diagnosis, { foreignKey: "appointmentId" })
Appointment.hasOne(Payment, { foreignKey: "appointmentId" })
Department.hasOne(Appointment, { foreignKey: "departmentId" })


try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}


export default sequelize;