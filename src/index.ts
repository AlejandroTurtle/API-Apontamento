import express , { Request, Response } from "express"
import authroutes from './routes/auth'
import routeApontamento from './routes/apontamento'
import cors from 'cors'


const app = express()

app.use(cors())
app.use(express.json());
const port = process.env.PORT 





app.get('/', (_req: Request, res: Response) => {
    return res.send('Express Typescript on Vercel')
  })

const apiRouter = express.Router()
apiRouter.use(authroutes)
apiRouter.use(routeApontamento)

app.use("/api", apiRouter)

app.listen(port, () => console.log(`Server running on port ${port}`))



