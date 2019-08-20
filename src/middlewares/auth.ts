// Http Petitions
import { Request, Response, NextFunction } from 'express';

// Json Web Token
import jsonwebtoken from 'jsonwebtoken';

// Moment
import moment from 'moment';

// Constants
import Constants from '../config/constants';

export class Auth {

    // Crea una nueva instancia de la clase Auth
    private static authInstance: Auth;

    private constructor() {}

    // Devuelve la instancia de la clase Auth
    public static get instanceAuth(): Auth {
        return this.authInstance || (this.authInstance = new this());
    }

    /**
     * Verifica si el token es valido
     * @param req 
     * @param res 
     * @param next 
     */
    public authenticatedToken( req: Request, res: Response, next: NextFunction ) {

        if ( !req.headers.authorization ) {
            return res.json({
                status: 'NOK',
                code: 203,
                message: 'La petición no tiene la cabecera de autenticación'

            });
        } else {

            const token = req.headers.authorization.replace(/['"]+g/, '');
            
            // Valida si el token es valido
            try {
                const payload: any = jsonwebtoken.verify(token, Constants.SECRET_KEY);
            } catch (error) {
                
                if (error.name === Constants.EXPIRED_TOKEN) {
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
