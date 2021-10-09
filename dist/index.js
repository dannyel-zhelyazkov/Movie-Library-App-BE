"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const database_1 = require("./database");
dotenv_1.default.config();
const port = process.env.SERVER_PORT;
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: 'http://localhost:3000',
}));
(0, database_1.connectDb)().then(() => app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
}));
//# sourceMappingURL=index.js.map