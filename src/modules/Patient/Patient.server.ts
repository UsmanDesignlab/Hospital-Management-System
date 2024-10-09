import { Patient } from "./Patient.Model"
import { Users } from "../User/User.Model"
import { Diagnosis } from "../Diagnosis/diagnosis.model"
import { Payment } from "../Payment/Payment.Model"


export default class patient{

  public static async findAll(){
    return await Patient.findAll({})
  }

  public static async findOne(id:string){
    return await Patient.findOne({where:{id}})
  }

  public static async AllCreates(all:any){
    return await Patient.create(all)
  }

  public static async Update(updated:any,query:any){
    return await Patient.update(updated,query)
  }

  public static async Destroy(deleted:any){
    return await Patient.destroy(deleted)
  }

  public static async findOneOne(userId:any){
    return await Patient.findOne({where:{userId}})
  }
  
  
  public static async findOneUser(id:any){
    return await Users.findOne({where:{id}})
  }

  public static async findOnePatient(userId:any){
    return await Patient.findOne({where:{userId}})
  }

  public static async findOneDiagnosis(userId:any){
    return await Diagnosis.findOne({where:{userId}})
  }
  
  public static async findOnePayment(userId:any){
    return await Payment.findAll({where:{userId}})
  }

}