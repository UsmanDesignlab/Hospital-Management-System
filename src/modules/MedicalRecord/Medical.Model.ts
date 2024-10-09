import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { IsString, IsInt, IsDateString, IsOptional, IsPositive, Length, IsEmail, Min, Max, IsEnum } from 'class-validator';

interface Appointments {
  id: number;
  name?: string;
  checkingDate?: string;
  diagnosis?: string;
  treatment?: boolean;
  appointmentId?: number;
  userId?: number
}

@Table({
  tableName: 'record',
  timestamps: true,
})
export class Record extends Model<Appointments> implements Appointments {
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


  @IsString()
  @Length(50)
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  diagnosis?: string;

  @IsOptional()
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  treatment?: boolean;


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