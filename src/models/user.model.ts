import { DataTypes, Model } from 'sequelize';
import sequelize from '../database';

class User extends Model {
  public userId?: number;
  public name!: string;
  public email!: string;
  public password!: string;
}

User.init(
  {
    userId: {
      type: DataTypes.INTEGER,  // Remover UNSIGNED
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'users',
  }
);

export default User;
