import express from "express"
import authroutes from './routes/auth';
import routeApontamento from './routes/apontamento';
import bodyParser from "body-parser";
import sequelize from './database';
import cors from 'cors';

const app = express()



app.use(bodyParser.json())
app.use(cors())
app.use("/api", authroutes, routeApontamento)

const startServer = async () => {
    try {
      await sequelize.sync();
      app.listen(5000, () => {
        console.log('Servidor rodando na porta 5000');
      });
    } catch (error) {
      console.error('Erro ao iniciar o servidor:', error);
    }
  };
  
  startServer();




