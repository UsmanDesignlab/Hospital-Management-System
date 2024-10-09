import { Payment } from "./Payment.Model"
import { Appointment } from "../Appointment/Appointment.Model"


export default class payment{

  public static async findAll(){
    return await Payment.findAll({})
  }

  public static async findOne(id:string){
    return await Payment.findOne({where:{id}})
  }

  public static async AllCreates(all:any){
    return await Payment.create(all)
  }

  public static async Update(updated:any,query:any){
    return await Payment.update(updated,query)
  }

  public static async Destroy(deleted:any){
    return await Payment.destroy(deleted)
  }
  
  public static async findOneAppointment(id:string){
    return await Appointment.findOne({where:{id}})
  }
}