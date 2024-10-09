import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { IsString, IsInt, IsDateString, IsOptional, IsPositive, Length, IsEmail, Min, Max, IsEnum } from 'class-validator';

interface Appointments {
  id: number;
  image?: string;
  appointmentId?: number;
  userId?: number;
}

@Table({
  tableName: 'diagnosis',
  timestamps: true,
})
export class Diagnosis extends Model<Appointments> implements Appointments {
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
  image?: string;


  @IsInt()
  @Column({
    field: "appointment_Id",
    type: DataType.INTEGER,
    allowNull: false,
  })
  appointmentId?: number;

  @IsInt()
  @Column({
    field: "user_Id",
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId?: number;
}