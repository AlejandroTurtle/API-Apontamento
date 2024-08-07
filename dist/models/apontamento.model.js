"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../database"));
const user_model_1 = __importDefault(require("./user.model"));
class Apontamento extends sequelize_1.Model {
}
Apontamento.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: user_model_1.default,
            key: 'userId',
        },
        allowNull: false,
        field: 'userid'
    },
    data: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: false,
    },
    entrada: {
        type: sequelize_1.DataTypes.TIME,
        allowNull: false,
    },
    saida: {
        type: sequelize_1.DataTypes.TIME,
        allowNull: false,
    },
    atividade: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: database_1.default,
    tableName: 'apontamentos',
    timestamps: false,
});
// Define o relacionamento entre Apontamento e User
Apontamento.belongsTo(user_model_1.default, { foreignKey: 'userId' });
user_model_1.default.hasMany(Apontamento, { foreignKey: 'userId' });
exports.default = Apontamento;
//# sourceMappingURL=apontamento.model.js.map