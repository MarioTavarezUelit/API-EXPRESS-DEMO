// Http Petitions
import { Request, Response} from 'express';

export abstract class Auth {

    /**
     * Autentica un usuario y genera un token para el uso de los procesos
     * @param req 
     * @param res 
     */
    public async auth( req: Request, res: Response ): Promise<any> {}

    /**
     * Envia correo para reestablecer password
     * @param req 
     * @param res 
     */
    public async resetPassword( req: Request, res: Response ): Promise<any> {}

    /**
     * Actualiza el password del usuario
     * @param req 
     * @param res 
     */
    public async changePassword( req: Request, res: Response ): Promise<any> {}

}