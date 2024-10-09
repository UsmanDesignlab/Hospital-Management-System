import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { IsString, IsInt, IsDateString, IsOptional, IsPositive, Length, IsEmail, Min, Max, IsEnum } from 'class-validator';

enum UserRole {
  Admin = "Admin",
  Patient = "Patient",
  Doctor = "Doctor",
  Staff = "Staff",
}


interface User {
  id: number;
  username?: string;
  email?: string;
  password: string;
  role: string;
  phoneNumber?: string;
  otp?: string;
  otpExpires?: Date;
  isVerified: boolean;
}

@Table({
  tableName: 'user',
  timestamps: true,
})
export class Users extends Model<User> implements User {
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
  username?: string;


  @IsEmail()
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email?: string;

  @IsString()
  @Min(3)
  @Max(6)
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string;

  @IsEnum(UserRole)
  @IsString()
  @Column({
    type: DataType.ENUM(UserRole.Admin, UserRole.Patient, UserRole.Staff, UserRole.Doctor),
    allowNull: true,
  })
  role!: string;


  @IsInt()
  @Min(11)
  @Max(11)
  @IsOptional()
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  phoneNumber?: string;


  @IsString()
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  otp?: string;

  @IsDateString()
  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  otpExpires?: Date;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  isVerified!: boolean;
}
