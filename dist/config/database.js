"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Postgres
const pg_promise_1 = __importDefault(require("pg-promise"));
// Constants
const constants_1 = __importDefault(require("./constants"));
// Puerto de ambiente del servidor de base de datos o ingresar un puerto temporal
const port = parseInt(process.env.PGPORT || constants_1.default.PORT_DATABASE, 10);
// Configuracion de conexion con servidor de postgres
const config = {
    database: process.env.PGDATABASE || constants_1.default.DATABASE,
    host: process.env.PGHOST || constants_1.default.HOST,
    port,
    user: process.env.PGUSER || constants_1.default.USER_DATABASE,
    password: process.env.PGPASSWORD || constants_1.default.PASSWORD_DATABASE
};
const pgp = pg_promise_1.default();
const db = pgp(config);
exports.default = db;
