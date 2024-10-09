import { Staff } from "./Staff.Model"
import { Users } from "../User/User.Model"


export default class staff{

  public static async findAll(){
    return await Staff.findAll({})
  }

  public static async findOne(id:string){
    return await Staff.findOne({where:{id}})
  }

  public static async AllCreates(all:any){
    return await Staff.create(all)
  }

  public static async Update(updated:any,query:any){
    return await Staff.update(updated,query)
  }

  public static async Destroy(deleted:any){
    return await Staff.destroy(deleted)
  }

  public static async findOneUsers(id:any){
    return await Users.findOne({where:{id}})
  }

  public static async findOneOne(userId:any){
    return await Staff.findOne({where:{userId}})
  }
  
  public static async findOneUser(id:string){
    return await Users.findOne({where:{id}})
  }

  public static async findOneStaff(userId:any){
    return await Staff.findAll({where:{userId}})
  }
}