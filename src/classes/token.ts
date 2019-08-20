// Json Web Token
import jsonwebtoken from 'jsonwebtoken';

// Moment
import moment from 'moment';

// Constants
import Constants from '../config/constants';

export class Token {

    // Crea una instancia de la clase Token
    private static tokenInstance: Token;

    private constructor() {}

    /**
     * Devuelve la instancia de la clase Token
     */
    public static get instanceToken(): Token {
        return this.tokenInstance || (this.tokenInstance = new this());
    }

    /**
     * Genera un token mediante los datos del usuario
     * @param user 
     */
    public generateToken(user: any): string {

        let payload = {
            sub: user.id,
            nombre: user.nombre,
            apellido: user.apellido,
            email: user.email,
            iat: moment().unix(),
            exp: moment().add(1, 'days').unix()
        };

        return jsonwebtoken.sign(payload, Constants.SECRET_KEY);
    }

}