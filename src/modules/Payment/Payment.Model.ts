import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { IsString, IsInt, IsDateString, IsOptional, IsPositive, Length, IsEmail, Min, Max, IsEnum } from 'class-validator';


interface Appointments {
  id: number;
  name?:string;
  checkingDate?: string;
  amount?:number;
  appointmentId?:number;
  userId?: number;
}

@Table({
  tableName: 'payment',
  timestamps: true,
})
export class Payment extends Model<Appointments> implements Appointments {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @IsString()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name?: string;


  @IsDateString()
  @IsString()
  @Column({
    field: "checking_Date",
    type: DataType.DATE,
    allowNull: false,
  })
  checkingDate?: string;

  @IsInt()
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  amount?: number;

  @IsInt()
  @Column({
    field: "appointment_Id",
    type: DataType.INTEGER,
    allowNull: false,
  })
   appointmentId?: number;

  @Column({
    field: "user_Id",
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId?: number;
}