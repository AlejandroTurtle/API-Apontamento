import express, { Request, Response } from 'express';
import Apontamento  from '../models/apontamento.model';
import authenticateToken from '../middleware/authenticateToken';


const routeApontamento = express.Router();

declare module 'express-serve-static-core' {
    interface Request {
      userId?: number;
    }
  }

routeApontamento.post("/apontamento", authenticateToken, async (req, res) => {
    const {data, entrada, saida, atividade} = req.body


    try {
        const apontamento = await Apontamento.create({
          userId: req.userId,
          data,
          entrada,
          saida,
          atividade,
        });
        res.status(201).json(apontamento);
      } catch (error) {
        console.error('Erro ao criar apontamento:', error);
        res.status(500).json({ message: 'Erro ao criar apontamento', error });
      }
    });
    
    routeApontamento.get("/apontamento", authenticateToken, async (req: Request, res: Response) => {
      try {
        const apontamentos = await Apontamento.findAll({
          where: { userId: req.userId },
        });
        res.status(200).json(apontamentos);
      } catch (error) {
        console.error('Erro ao buscar apontamentos:', error);
        res.status(500).json({ message: 'Erro ao buscar apontamentos', error });
      }
    });

export default routeApontamento