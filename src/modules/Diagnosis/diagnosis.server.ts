import { Diagnosis } from "./diagnosis.model"
import { Appointment } from "../Appointment/Appointment.Model"


export default class diagnosis {

  public static async findAll() {
    return await Diagnosis.findAll({})
  }

  public static async findOne(id: any) {
    return await Diagnosis.findOne({ where: { id } })
  }

  public static async Create(data: any) {
    return await Diagnosis.create(data)
  }

  public static async Update(updated: any, query: any) {
    return await Diagnosis.update(updated, query)
  }

  public static async Destroy(deleted: any) {
    return await Diagnosis.destroy(deleted)
  }


  public static async findOneAppointment(id: any) {
    return await Appointment.findOne({ where: { id } })
  }

}