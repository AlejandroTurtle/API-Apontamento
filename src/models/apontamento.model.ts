import { DataTypes, Model } from 'sequelize';
import sequelize from '../database';
import User from './user.model';

class Apontamento extends Model {
  public id?: number;
  public userId?: number;
  public data!: string;
  public entrada!: string;
  public saida!: string;
  public atividade!: string;
}

Apontamento.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'userId',
      },
      allowNull: false,
      field: 'userid'
    },
    data: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    entrada: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    saida: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    atividade: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'apontamentos',
    timestamps: false,
  }
);

// Define o relacionamento entre Apontamento e User
Apontamento.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Apontamento, { foreignKey: 'userId' });

export default Apontamento;
