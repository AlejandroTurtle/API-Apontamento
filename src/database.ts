import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
  'sistemaapontamento', // Nome do banco de dados
  'root', // Nome de usuário
  '', // Senha
  
  {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
  }
);

export default sequelize;
