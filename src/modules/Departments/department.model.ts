import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { IsString, IsInt, IsDateString, IsOptional, IsPositive, Length, IsEmail, Min, Max, IsEnum } from 'class-validator';


interface Appointments {
  id: number;
  department_name?: string;
  doctorsAvailable?: number;
  userId?: number;
}

@Table({
  tableName: 'department',
  timestamps: true,
})
export class Department extends Model<Appointments> implements Appointments {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @IsString()
  @Length(30)
  @Column({
    field: "department_name",
    type: DataType.STRING,
    allowNull: false,
  })
  departmentName?: string;



  @IsInt()
  @Column({
    field: "doctors_available",
    type: DataType.INTEGER,
    allowNull: false,
  })
  doctorsAvailable?: number;

  @IsInt()
  @Column({
    field: "user_Id",
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId?: number;


}