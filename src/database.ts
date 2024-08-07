import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
  "postgres://tywyikbr:g3pDIzVf6YPPHuohBNR9K0WwtcjQVk1I@isabelle.db.elephantsql.com/tywyikbr",
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


