import { Users } from "./User.Model"

export default class users{

  public static async findAll(){
    return await Users.findAll({})
  }

  public static async findOne(email:any){
    return await Users.findOne({where:{email}})
  }

  public static async AllCreates(all:any){
    return await Users.create(all)
  }

  public static async Update(updated:any,query:any){
    return await Users.update(updated,query)
  }

  public static async Destroy(deleted:any){
    return await Users.destroy(deleted)
  }
  
}