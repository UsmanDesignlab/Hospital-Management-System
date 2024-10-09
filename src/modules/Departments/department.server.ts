import { Department } from "./department.model"
import { Users } from "../User/User.Model"

export default class department{

  public static async findAllDepartments(){
    return await Department.findAll({})
  }

  public static async findOneDepartment(id:string){
    return await Department.findOne({where:{id}})
  }

  public static async findOneCreate(data:any){
    return await Department.create(data)
  }
  
  // query is the condition used to find the specific record(s) in the database (e.g., finding by id).
  public static async findUpdate(updated:any,query:any){
    return await Department.update(updated,query)
  }

  public static async find_destroy(deleted:any){
    return await Department.destroy(deleted)
  }

  public static async findAllDepartment(userId:any){
    return await Department.findAll({where:{userId}})
  }

  public static async findOneUser(id:any){
    return await Users.findAll({where:{id}})
  }
}