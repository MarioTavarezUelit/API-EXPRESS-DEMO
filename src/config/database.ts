// Postgres
import pgPromise from 'pg-promise';
// Constants
import Constants from './constants';

// Puerto de ambiente del servidor de base de datos o ingresar un puerto temporal
const port = parseInt(process.env.PGPORT || Constants.PORT_DATABASE, 10);

// Configuracion de conexion con servidor de postgres
const config = {
    database: process.env.PGDATABASE || Constants.DATABASE,
    host: process.env.PGHOST || Constants.HOST,
    port,
    user: process.env.PGUSER || Constants.USER_DATABASE,
    password: process.env.PGPASSWORD || Constants.PASSWORD_DATABASE
}

const pgp = pgPromise();
const db = pgp(config);

export default db;


