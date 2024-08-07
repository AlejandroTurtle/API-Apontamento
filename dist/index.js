"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("./routes/auth"));
const apontamento_1 = __importDefault(require("./routes/apontamento"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const port = process.env.PORT;
app.get('/', (_req, res) => {
    return res.send('Express Typescript on Vercel');
});
const apiRouter = express_1.default.Router();
apiRouter.use(auth_1.default);
apiRouter.use(apontamento_1.default);
app.use("/api", apiRouter);
app.listen(port, () => console.log(`Server running on port ${port}`));
//# sourceMappingURL=index.js.map