import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';

dotenv.config(); // Carrega variáveis do arquivo .env

console.log('Database URL:', process.env.POSTGRES_URL); // Verifica se a variável está carregada

const sequelize = new Sequelize(process.env.POSTGRES_URL as string, {
  dialect: 'postgres',
  define: {
    timestamps: false
  },
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // Pode ser necessário em alguns casos
    }
  }
});

export default sequelize;
