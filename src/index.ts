import express from "express"
import authroutes from './routes/auth'
import routeApontamento from './routes/apontamento'
import bodyParser from "body-parser"
import sequelize from './database'
import cors from 'cors'

const app = express()

const port = process.env.PORT || 5000



app.use(bodyParser.json())
app.use(cors())
app.use("/", routeApontamento)

const startServer = async () => {
    try {
      await sequelize.sync();
      app.listen(port, () => {
        console.log(`Servidor rodando na porta ${port}`)
      })
    } catch (error) {
      console.error('Erro ao iniciar o servidor:', error)
    }
  }
  
  startServer()




