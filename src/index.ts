import express from "express"
import authroutes from './routes/auth'
import routeApontamento from './routes/apontamento'
import bodyParser from "body-parser"
import cors from 'cors'


const app = express()


const port = process.env.PORT



app.use(bodyParser.json())
app.use(cors())
app.use("/", authroutes, routeApontamento)

app.listen(port, () => console.log(`Server running on port ${port}`))



