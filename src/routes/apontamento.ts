import express, { Request, Response } from "express";
import Apontamento from "../models/apontamento.model";
import authenticateToken from "../middleware/authenticateToken";
import nodemailer from "nodemailer";

const routeApontamento = express.Router();

declare module "express-serve-static-core" {
  interface Request {
    userId?: number;
  }
}

const smtp = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "suportealejandrog@gmail.com",
    pass: "gsgt rmma dxgh huzk",
  },
  tls: {
    rejectUnauthorized: true,
  },
});

routeApontamento.post("/apontamento", authenticateToken, async (req, res) => {
  const { data, entrada, saida, atividade } = req.body;

  try {
    const apontamentoExistente = await Apontamento.findOne({
      where: { userId: req.userId, data, entrada },
    });

    if (apontamentoExistente) {
      return res.status(400).json({ message: "Horário já apontado" });
    }

    const apontamento = await Apontamento.create({
      userId: req.userId,
      data,
      entrada,
      saida,
      atividade,
    });

    res.status(201).json(apontamento);
  } catch (error) {
    console.error("Erro ao criar apontamento:", error);
    res.status(500).json({ message: "Erro ao criar apontamento", error });
  }
});

routeApontamento.get(
  "/apontamento",
  authenticateToken,
  async (req: Request, res: Response) => {
    try {
      const apontamentos = await Apontamento.findAll({
        where: { userId: req.userId },
      });
      res.status(200).json(apontamentos);
    } catch (error) {
      console.error("Erro ao buscar apontamentos:", error);
      res.status(500).json({ message: "Erro ao buscar apontamentos", error });
    }
  }
);

routeApontamento.put(
  "/apontamento/:id",
  authenticateToken,
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { data, entrada, saida, atividade } = req.body;
    try {
      const apontamento = await Apontamento.findByPk(id);
      if (!apontamento) {
        return res.status(404).json({ message: "Apontamento não encontrado" });
      }
      if (apontamento.userId !== req.userId) {
        return res.status(403).json({ message: "Permissão negada" });
      }
      await apontamento.update({
        data,
        entrada,
        saida,
        atividade,
      });
      res.status(200).json({ message: "Apontamento atualizado com sucesso" });
    } catch (error) {
      console.error("Erro ao atualizar apontamento:", error);
      res.status(500).json({ message: "Erro ao atualizar apontamento", error });
    }
  }
);

routeApontamento.delete(
  "/apontamento/:id",
  authenticateToken,
  async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const apontamento = await Apontamento.findByPk(id);
      if (!apontamento) {
        return res.status(404).json({ message: "Apontamento não encontrado" });
      }
      if (apontamento.userId !== req.userId) {
        return res.status(403).json({ message: "Permissão negada" });
      }
      await apontamento.destroy();
      res.status(200).json({ message: "Apontamento excluído com sucesso" });
    } catch (error) {
      console.error("Erro ao excluir apontamento:", error);
      res.status(500).json({ message: "Erro ao excluir apontamento", error });
    }
  }
);

routeApontamento.post(
  "/apontamento/entraremContato",
  async (req: Request, res: Response) => {
    const { nome, email, mensagem } = req.body;

    console.log("Nome:", nome);
    console.log("Email:", email);
    console.log("Mensagem:", mensagem);

    let message = {
      from: "suportealejandrog@gmail.com",
      to: "alejandrogomes23@hotmail.com",
      subject: "Nova mensagem do seu portfólio",
      html: `
        <p>Olá Alejandro,</p>
        <p>Você recebeu uma nova mensagem do seu portfólio:</p>
        <p><strong>Nome:</strong> ${nome}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensagem:</strong></p>
        <p>${mensagem}</p>
        <p>Atenciosamente,</p>
        <p>Sua equipe de suporte</p>
      `,
    };
    console.log("Enviando e-mail");
    await smtp.sendMail(message);
    console.log("Email enviado");

    res.status(201).json({ message: "Mensagem enviada com sucesso" });
  }
);

export default routeApontamento;
