import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
  process.env.DB_NAME ?? 'sistemaapontamento', // Nome do banco de dados
  process.env.DB_USER ?? 'qakijygm', // Nome de usuário
  process.env.DB_PASSWORD ?? 'vmvB5wc3T_QUmW_4wL7zQBI5COPY5-P2', // Senha
  {
    host: process.env.DB_HOST ?? 'isabelle.db.elephantsql.com', // Host do banco de dados
    port: parseInt(process.env.DB_PORT ?? '5432', 10), // Porta do banco de dados
    dialect: 'postgres',
    logging: false,
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

export default sequelize;
