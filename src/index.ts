import express from "express"
import authroutes from './routes/auth'
import routeApontamento from './routes/apontamento'



const app = express()


const port = process.env.PORT





app.use("/", authroutes, routeApontamento)

app.listen(port, () => console.log(`Server running on port ${port}`))



