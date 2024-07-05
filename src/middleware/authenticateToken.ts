import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Acesso negado. Token não fornecido.' });

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret') as { userId: number };
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Token inválido.' });
  }
};

export default authenticateToken;
