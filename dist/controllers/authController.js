"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Bcrypt
const bcrypt_1 = __importDefault(require("bcrypt"));
// Mail
const mail_1 = require("../classes/mail");
// Token
const token_1 = require("../classes/token");
// Database
const database_1 = __importDefault(require("../config/database"));
class AuthController {
    constructor() { }
    /**
     * Devuelve la instancia de la clase AuthController
     */
    static get instanceAuthController() {
        return this.authControllerInstance || (this.authControllerInstance = new this());
    }
    /**
     * Autentica un usuario y genera un token para el uso de los procesos
     * @param req
     * @param res
     */
    auth(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = {};
            // Instancia de la clase token
            const token = token_1.Token.instanceToken;
            if (req.body) {
                yield database_1.default.func('auth_user', [req.body.email])
                    .then(response => {
                    if (response.length > 0) {
                        // Guarda las credenciales del usuario
                        user = response[0];
                        // Encrypta el password
                        bcrypt_1.default.compare(req.body.password, user.password, (errorCompare, check) => {
                            if (!check) {
                                return res.json({
                                    status: 'NOK',
                                    code: 500,
                                    message: 'Credenciales incorrectas'
                                });
                            }
                            else {
                                const tokenGenerate = token.generateToken(user);
                                return res.json({
                                    status: 'OK',
                                    code: 200,
                                    message: 'Usuario autenticado',
                                    token: tokenGenerate
                                });
                            }
                        });
                    }
                    else {
                        return res.json({
                            status: 'NOK',
                            code: 500,
                            message: 'Credenciales incorrectas'
                        });
                    }
                })
                    .catch(error => {
                    return res.json({
                        status: 'NOK',
                        code: 500,
                        message: 'Ocurrió un error, al autenticar el usuario'
                    });
                });
            }
            else {
                return res.json({
                    status: 'NOK',
                    code: 203,
                    message: 'Los datos del usuario son necesarios'
                });
            }
        });
    }
    /**
     * Envia correo para reestablecer password
     * @param req
     * @param res
     */
    resetPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Si llegan todos los paremetros de la peticion
            if (req.body) {
                // Instancia de la clase Mail
                const mail = mail_1.Mail.instanceMail;
                // Obtiene la respuesta del envio de correo
                const respMail = yield mail.sendMail(req.body.email);
                // Si se envio correo exitosamente se envia estatus 200
                if (respMail) {
                    return res.json({
                        status: 'OK',
                        code: 200,
                        message: 'Correo enviado exitosamente'
                    });
                }
                else {
                    return res.json({
                        status: 'NOK',
                        code: 500,
                        message: 'Ocurrió un error, no fue posible enviar el correo'
                    });
                }
            }
            else {
                return res.json({
                    status: 'NOK',
                    code: 203,
                    message: 'El email es necesario'
                });
            }
        });
    }
    /**
     * Actualiza el password del usuario
     * @param req
     * @param res
     */
    changePassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashCounts = 10;
            // Si llegan todos los parametros de la peticion
            if (req.body) {
                // Realiza un hash al nuevo password
                bcrypt_1.default.hash(req.body.password, hashCounts, (errorHash, hash) => {
                    // Si hace el hash correctamente se procede a actualizar el password
                    if (!errorHash) {
                        // Obtiene el hash
                        const passwordHash = hash;
                        // Invoca a la funcion que actualiza el password del usuario
                        database_1.default.func('forgot_password', [req.body.email, passwordHash])
                            .then(response => {
                            if (response[0].forgot_password === 0) {
                                return res.json({
                                    status: 'NOK',
                                    code: 204,
                                    message: 'Este email no se encuentra registrado'
                                });
                            }
                            else {
                                return res.json({
                                    status: 'OK',
                                    code: 200,
                                    message: 'Contraseña actualizada correctamente'
                                });
                            }
                        })
                            .catch(error => {
                            return res.json({
                                status: 'NOK',
                                code: 500,
                                message: 'Ocurrió un error al reestablecer contraseña'
                            });
                        });
                    }
                    else {
                        return res.json({
                            status: 'NOK',
                            code: 500,
                            message: 'Ocurrió un error al hacer hash del password'
                        });
                    }
                });
            }
            else {
                return res.json({
                    status: 'NOK',
                    code: 203,
                    message: 'El email es necesario'
                });
            }
        });
    }
}
exports.AuthController = AuthController;
