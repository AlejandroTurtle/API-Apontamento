import express , { Request, Response } from "express"
import authroutes from './routes/auth'
import routeApontamento from './routes/apontamento'



const app = express()


const port = process.env.PORT





app.get('/', (_req: Request, res: Response) => {
    return res.send('Express Typescript on Vercel')
  })

app.use("/", authroutes, routeApontamento)

app.listen(port, () => console.log(`Server running on port ${port}`))



