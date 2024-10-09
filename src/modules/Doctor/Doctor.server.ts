import { Doctor } from "./Doctor.Model"
import { Users } from "../User/User.Model"


export default class doctor{

  public static async findAll(){
    return await Doctor.findAll({})
  }

  public static async findOne(id:string){
    return await Doctor.findOne({where:{id}})
  }

  public static async find(email:any){
    return await Users.findOne({where:{email}})
  }

  public static async AllCreates(all:any){
    return await Doctor.create(all)
  }

  public static async Update(updated:any,query:any){
    return await Doctor.update(updated,query)
  }

  public static async Destroy(deleted:any){
    return await Doctor.destroy(deleted)
  }
  public static async findOneOne(userId:any){
    return await Doctor.findOne({where:{userId}})
  }

  public static async findOneUser(id:any){
    return await Users.findOne({where:{id}})
  }


  public static async findAllDoctor(userId:any){
    return await Doctor.findAll({where:{userId}})
  }
}