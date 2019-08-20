// NodeMailer
import nodemailer from 'nodemailer';
// Constants
import Constants from '../config/constants';
import { Server } from './server';

export class Mail {

    // Crea la instancia de la clase Mail
    private static mailInstance: Mail;

    // Datos del servicio de correo
    private transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // upgrade later with STARTTLS
        auth: {
            user: Constants.EMAIL,
            pass: Constants.PASSWORD_EMAIL
        }
    });

    private constructor() { }

    /**
     * Devuelve la instancia de la clase mail
     */
    public static get instanceMail() {
        return this.mailInstance || (this.mailInstance = new this());
    }

    /**
     * Envia el email para recuperar el password
     * @param email 
     */
    public sendMail(email: string): Promise<any> {

        // Instancia de la clase server
        const server = Server.instanceServer;

        const mailOptions = {
            from: Constants.EMAIL,
            to: email,
            subject: Constants.SUBJECT,
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