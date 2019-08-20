"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Constants {
}
/**
 * SERVER
 */
// PORT SERVER
Constants.PORT = 3000;
/**
 * POSTGRES DATABASE
 */
// HOST DATABASE TEMPORARY
Constants.HOST = 'localhost';
// PORT DATABASE TEMPORARY
Constants.PORT_DATABASE = '5432';
// USER DATABASE TEMPORARY
Constants.USER_DATABASE = 'mario';
// PASSWORD DATABASE TEMPORARY
Constants.PASSWORD_DATABASE = 'root';
// NAME DATABASE
Constants.DATABASE = 'openbis';
/**
 * JSON WEB TOKEN
 */
// SECRET KEY TOKEN
Constants.SECRET_KEY = 'P_@_R_@_L_E_P_1_P_3_D_0_$$$/D3S0x1Rr1B0nuScl3iC0';
// EXPIRED TOKEN
Constants.EXPIRED_TOKEN = 'TokenExpiredError';
/**
 * Email
 */
// SUBJECT
Constants.SUBJECT = 'Recuperación de contraseña';
// EMAIL
Constants.EMAIL = 'mariojosueitq@gmail.com';
// PASSWORD
Constants.PASSWORD_EMAIL = 'Madarasusano';
// SERVICE EMAIL
Constants.SERVICE_EMAIL = 'Gmail';
/**
 * Routes
 */
// ROUTE
Constants.OPENBIS = 'openbis';
exports.default = Constants;
