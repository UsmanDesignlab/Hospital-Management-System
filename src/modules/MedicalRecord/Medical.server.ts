import { Record } from "./Medical.Model"
import { Appointment } from "../Appointment/Appointment.Model"


export default class record{

  public static async findAll(){
    return await Record.findAll({})
  }

  public static async findOne(id:string){
    return await Record.findOne({where:{id}})
  }

  public static async Create(data:any){
    return await Record.create(data)
  }

  public static async Update(updated:any,query:any){
    return await Record.update(updated,query)
  }

  public static async Destroy(deleted:any){
    return await Record.destroy(deleted)
  }

  
  public static async findOneAppointment(id:string){
    return await Appointment.findOne({where:{id}})
  }
  
}