import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { IsString, IsInt, IsDateString, IsOptional, IsPositive, Length, IsEmail, Min, Max, IsEnum } from 'class-validator';


interface Staffs {
  id: number;
  name?: string;
  role: string;
  phoneNumber?: string;
  userId: number;
}

@Table({
  tableName: 'staff',
  timestamps: true,
})
export class Staff extends Model<Staffs> implements Staffs {
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

  @IsString()
  @Column({
    type: DataType.STRING,
    allowNull: false,
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



  @Column({
    field: "user_Id",
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId!: number;
}
