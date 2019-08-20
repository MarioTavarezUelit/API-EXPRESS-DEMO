// Http Petitions
import { Request, Response } from 'express';
// Bcrypt
import bcrypt from 'bcrypt';
// Mail
import { Mail } from '../classes/mail';
// Token
import { Token } from '../classes/token';
// Database
import db from '../config/database';
// Abstract Classes
import { Auth } from '../abstract_classes/auth';

export class AuthController implements Auth{

    // Crea una instancia de la clase AuthController
    private static authControllerInstance: AuthController;

    private constructor() { }

    /**
     * Devuelve la instancia de la clase AuthController
     */
    public static get instanceAuthController() {
        return this.authControllerInstance || (this.authControllerInstance = new this());
    }

    /**
     * Autentica un usuario y genera un token para el uso de los procesos
     * @param req 
     * @param res 
     */
    public async auth(req: Request, res: Response): Promise<any> {

        let user: any = {};
        // Instancia de la clase token
        const token = Token.instanceToken;

        if (req.body) {
            await db.func('auth_user', [req.body.email])
                .then(response => {

                    if (response.length > 0) {
                        // Guarda las credenciales del usuario
                        user = response[0];
                        // Encrypta el password
                        bcrypt.compare(req.body.password, user.password, (errorCompare, check) => {
                            if (!check) {
                                return res.json({
                                    status: 'NOK',
                                    code: 500,
                                    message: 'Credenciales incorrectas'
                                });
                            } else {
                                const tokenGenerate = token.generateToken(user)
                                return res.json({
                                    status: 'OK',
                                    code: 200,
                                    message: 'Usuario autenticado',
                                    token: tokenGenerate
                                });
                            }
                        });
                    } else {
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

        } else {
            return res.json({
                status: 'NOK',
                code: 203,
                message: 'Los datos del usuario son necesarios'
            });
        }
    }

    /**
     * Envia correo para reestablecer password
     * @param req 
     * @param res 
     */
    public async resetPassword(req: Request, res: Response): Promise<any> {

        // Si llegan todos los paremetros de la peticion
        if (req.body) {
            // Instancia de la clase Mail
            const mail = Mail.instanceMail;
            // Obtiene la respuesta del envio de correo
            const respMail = await mail.sendMail(req.body.email);
            // Si se envio correo exitosamente se envia estatus 200
            if (respMail) {
                return res.json({
                    status: 'OK',
                    code: 200,
                    message: 'Correo enviado exitosamente'
                });
            } else {
                return res.json({
                    status: 'NOK',
                    code: 500,
                    message: 'Ocurrió un error, no fue posible enviar el correo'
                });
            }

        } else {
            return res.json({
                status: 'NOK',
                code: 203,
                message: 'El email es necesario'
            });
        }

    }

    /**
     * Actualiza el password del usuario
     * @param req 
     * @param res 
     */
    public async changePassword(req: Request, res: Response) {

        const hashCounts = 10;

        // Si llegan todos los parametros de la peticion
        if (req.body) {
            // Realiza un hash al nuevo password
            bcrypt.hash(req.body.password, hashCounts, (errorHash, hash) => {
                // Si hace el hash correctamente se procede a actualizar el password
                if (!errorHash) {
                    // Obtiene el hash
                    const passwordHash = hash;
                    // Invoca a la funcion que actualiza el password del usuario
                    db.func('forgot_password', [req.body.email, passwordHash])
                        .then(response => {

                            if (response[0].forgot_password === 0) {
                                return res.json({
                                    status: 'NOK',
                                    code: 204,
                                    message: 'Este email no se encuentra registrado'
                                });
                            } else {
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
                } else {
                    return res.json({
                        status: 'NOK',
                        code: 500,
                        message: 'Ocurrió un error al hacer hash del password'
                    });
                }
            })
        } else {
            return res.json({
                status: 'NOK',
                code: 203,
                message: 'El email es necesario'
            });
        }

    }
}