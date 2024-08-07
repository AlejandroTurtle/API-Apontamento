import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
  "postgres://default:8TM9CkqFOxNv@ep-round-fog-a4z1o5es-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require",
  {
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
  }
);


export default sequelize;


