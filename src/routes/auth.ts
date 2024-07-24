import express, { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/user.model';
import jwt  from 'jsonwebtoken';



const router = express.Router();

declare module 'express-serve-static-core' {
  interface Request {
      userId?: number;
  }
}

router.post('/register', async (req, res) => {
    const { name, email, password } = req.body

    const user = await User.findOne({ where: { email } })

    if (user) {
      return res.status(400).json({ message: 'Já existe um email igual a este cadastrado' })
    }
  
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt)
      const user = await User.create({ name, email, password: hashedPassword })
      res.status(201).json(user)
    } catch (error) {
      console.error('Erro ao criar usuário:', error)
      res.status(500).json({ message: 'Erro ao criar usuário', error })
    }
  })


  router.post('/login', async (req: Request, res: Response) => {
    const { email, password } = req.body
  
    const user = await User.findOne({ where: { email } })
  
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' })
    }
  
    const isPasswordValid = await bcrypt.compare(password, user.password)
  
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Senha incorreta' })
    }
  
    const token = jwt.sign({ userId: user.userId, name: user.name }, 'your_jwt_secret', { expiresIn: '24h' })
  
    res.status(200).json({ message: 'Login bem-sucedido', token })
  })

  



  export default router