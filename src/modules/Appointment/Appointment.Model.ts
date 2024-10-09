import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { IsString, IsInt, IsDateString, IsOptional, IsPositive, Length, IsEmail, Min, Max, IsEnum } from 'class-validator';


interface Appointments {
  id: number;
  name?: string;
  phoneNumber?: string;
  checkingDate?: string;
  amount?: number;
  patientId?: number;
  doctorId?: number;
  departmentId?: number;
}

@Table({
  tableName: 'appointment',
  timestamps: true,
})
export class Appointment extends Model<Appointments> implements Appointments {
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

  @IsInt()
  @Min(11)
  @Max(11)
  @IsOptional()
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  phoneNumber?: string;

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

  @Column({
    field: "doctor_Id",
    type: DataType.INTEGER,
    allowNull: false,
  })
  doctorId?: number;

  @Column({
    field: "patient_Id",
    type: DataType.INTEGER,
    allowNull: false,
  })
  patientId?: number;

  @Column({
    field: "department_Id",
    type: DataType.INTEGER,
    allowNull: false,
  })
  departmentId?: number;
}