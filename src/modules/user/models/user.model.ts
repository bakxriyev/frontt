import { 
    Table, 
    Model, 
    Column, 
    DataType, 
    HasMany, 
  } from 'sequelize-typescript';
  import { UserRoles } from '../enums';
  
  @Table({ tableName: 'users', timestamps: true })
  export class User extends Model {

    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
    id: number;

    @Column({ type: DataType.STRING, allowNull: false })
    first_name: string;

    @Column({ type: DataType.STRING, allowNull: false })
    last_name: string;
  
    @Column({ type: DataType.STRING, allowNull: false, unique: true })
    email: string;
  
    @Column({ type: DataType.BIGINT, allowNull: true })
    phone_number?: string;
  
    @Column({ type: DataType.STRING, allowNull: false })
    password: string;
  
    @Column({
      type: DataType.ENUM,
      values: [UserRoles.admin, UserRoles.user],
      allowNull: false,
      defaultValue: UserRoles.user,
    })
    role?: UserRoles;

    @Column({ type: DataType.STRING, allowNull: true })
    maqola:string;
  }
  