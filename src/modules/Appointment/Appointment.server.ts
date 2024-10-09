import { Appointment } from "./Appointment.Model"
import { Doctor } from "../Doctor/Doctor.Model"
import { Patient } from "../Patient/Patient.Model"
import { Department } from "../Departments/department.model"

export default class appointment{

  public static async findAll(){
    return await Appointment.findAll({})
  }

  public static async findOne(id:any){
    return await Appointment.findOne({where:{id}})
  }

  public static async Create(data:any){
    return await Appointment.create(data)
  }
  

  public static async Update(updated:any,query:any){
    return await Appointment.update(updated,query)
  }

  public static async destroy(deleted:any){
    return await Appointment.destroy(deleted)
  }

  public static async findOneDoctor(id:any){
    return await Doctor.findOne({where:{id}})
  }
  
  public static async findOnePatient(id:any){
    return await Patient.findOne({where:{id}})
  }

  public static async findOneDepartment(id:any){
    return await Department.findOne({where:{id}})
  }

}