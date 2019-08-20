"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// NodeMailer
const nodemailer_1 = __importDefault(require("nodemailer"));
// Constants
const constants_1 = __importDefault(require("../config/constants"));
const server_1 = require("./server");
class Mail {
    constructor() {
        // Datos del servicio de correo
        this.transporter = nodemailer_1.default.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: constants_1.default.EMAIL,
                pass: constants_1.default.PASSWORD_EMAIL
            }
        });
    }
    /**
     * Devuelve la instancia de la clase mail
     */
    static get instanceMail() {
        return this.mailInstance || (this.mailInstance = new this());
    }
    /**
     * Envia el email para recuperar el password
     * @param email
     */
    sendMail(email) {
        // Instancia de la clase server
        const server = server_1.Server.instanceServer;
        const mailOptions = {
            from: constants_1.default.EMAIL,
            to: email,
            subject: constants_1.default.SUBJECT,
            html: ` Hola buen día.
                    <br>
                    Para recuperar su contraseña es necesario dar clic en el siguiente enlace:
                    <br>
                    http://localhost:4200/login/reset/update-password/${email}`
        };
        return new Promise((resolve, reject) => {
            this.transporter.sendMail(mailOptions, function (err, info) {
                if (err) {
                    server.logger.error(`Ocurrió el siguiente error al enviar correo: ${err}`);
                    resolve(false);
                }
                else {
                    server.logger.info(`Se ha enviado un correo de recuperación al mail ${email}`);
                    resolve(true);
                }
            });
        });
    }
}
exports.Mail = Mail;
