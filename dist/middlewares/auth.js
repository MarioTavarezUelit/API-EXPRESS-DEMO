"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Json Web Token
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Constants
const constants_1 = __importDefault(require("../config/constants"));
class Auth {
    constructor() { }
    // Devuelve la instancia de la clase Auth
    static get instanceAuth() {
        return this.authInstance || (this.authInstance = new this());
    }
    /**
     * Verifica si el token es valido
     * @param req
     * @param res
     * @param next
     */
    authenticatedToken(req, res, next) {
        if (!req.headers.authorization) {
            return res.json({
                status: 'NOK',
                code: 203,
                message: 'La petición no tiene la cabecera de autenticación'
            });
        }
        else {
            const token = req.headers.authorization.replace(/['"]+g/, '');
            // Valida si el token es valido
            try {
                const payload = jsonwebtoken_1.default.verify(token, constants_1.default.SECRET_KEY);
            }
            catch (error) {
                if (error.name === constants_1.default.EXPIRED_TOKEN) {
                    return res.json({
                        status: 'NOK',
                        code: 401,
                        message: 'El token ha expirado'
                    });
                }
                return res.json({
                    status: 'NOK',
                    code: 500,
                    message: 'Token no válido'
                });
            }
            next();
        }
    }
}
exports.Auth = Auth;
