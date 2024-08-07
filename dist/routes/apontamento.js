"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const apontamento_model_1 = __importDefault(require("../models/apontamento.model"));
const authenticateToken_1 = __importDefault(require("../middleware/authenticateToken"));
const routeApontamento = express_1.default.Router();
routeApontamento.post("/apontamento", authenticateToken_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { data, entrada, saida, atividade } = req.body;
    try {
        const apontamentoExistente = yield apontamento_model_1.default.findOne({ where: { userId: req.userId, data, entrada } });
        if (apontamentoExistente) {
            return res.status(400).json({ message: "Horário já apontado" });
        }
        const apontamento = yield apontamento_model_1.default.create({
            userId: req.userId,
            data,
            entrada,
            saida,
            atividade,
        });
        res.status(201).json(apontamento);
    }
    catch (error) {
        console.error('Erro ao criar apontamento:', error);
        res.status(500).json({ message: 'Erro ao criar apontamento', error });
    }
}));
routeApontamento.get("/apontamento", authenticateToken_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const apontamentos = yield apontamento_model_1.default.findAll({
            where: { userId: req.userId },
        });
        res.status(200).json(apontamentos);
    }
    catch (error) {
        console.error('Erro ao buscar apontamentos:', error);
        res.status(500).json({ message: 'Erro ao buscar apontamentos', error });
    }
}));
routeApontamento.put("/apontamento/:id", authenticateToken_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { data, entrada, saida, atividade } = req.body;
    try {
        const apontamento = yield apontamento_model_1.default.findByPk(id);
        if (!apontamento) {
            return res.status(404).json({ message: 'Apontamento não encontrado' });
        }
        if (apontamento.userId !== req.userId) {
            return res.status(403).json({ message: 'Permissão negada' });
        }
        yield apontamento.update({
            data,
            entrada,
            saida,
            atividade
        });
        res.status(200).json({ message: 'Apontamento atualizado com sucesso' });
    }
    catch (error) {
        console.error('Erro ao atualizar apontamento:', error);
        res.status(500).json({ message: 'Erro ao atualizar apontamento', error });
    }
}));
routeApontamento.delete("/apontamento/:id", authenticateToken_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const apontamento = yield apontamento_model_1.default.findByPk(id);
        if (!apontamento) {
            return res.status(404).json({ message: 'Apontamento não encontrado' });
        }
        if (apontamento.userId !== req.userId) {
            return res.status(403).json({ message: 'Permissão negada' });
        }
        yield apontamento.destroy();
        res.status(200).json({ message: 'Apontamento excluído com sucesso' });
    }
    catch (error) {
        console.error('Erro ao excluir apontamento:', error);
        res.status(500).json({ message: 'Erro ao excluir apontamento', error });
    }
}));
exports.default = routeApontamento;
//# sourceMappingURL=apontamento.js.map