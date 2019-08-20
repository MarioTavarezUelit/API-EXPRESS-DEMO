"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Json Web Token
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Moment
const moment_1 = __importDefault(require("moment"));
// Constants
const constants_1 = __importDefault(require("../config/constants"));
class Token {
    constructor() { }
    /**
     * Devuelve la instancia de la clase Token
     */
    static get instanceToken() {
        return this.tokenInstance || (this.tokenInstance = new this());
    }
    /**
     * Genera un token mediante los datos del usuario
     * @param user
     */
    generateToken(user) {
        let payload = {
            sub: user.id,
            nombre: user.nombre,
            apellido: user.apellido,
            email: user.email,
            iat: moment_1.default().unix(),
            exp: moment_1.default().add(1, 'days').unix()
        };
        return jsonwebtoken_1.default.sign(payload, constants_1.default.SECRET_KEY);
    }
}
exports.Token = Token;
