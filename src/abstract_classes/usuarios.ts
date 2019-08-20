// Http Petitions
import { Request, Response} from 'express';

export abstract class Usuarios {

    /**
     * Devuelve todos los usuarios
     * @param req 
     * @param res 
     */
    public async getAllUsers( req: Request, res: Response ): Promise<any> {}

    /**
     * Devuelve el usuario mediante el id
     * @param req 
     * @param res 
     */
    public async getUserById( req: Request, res: Response): Promise<any> {}

    /**
     * Devuelve los usuarios por criterio de busqueda
     * @param req 
     * @param res 
     */
    public async getUsersByCriteria( req: Request, res: Response ): Promise<any> {}

    /**
     * Devuelve los usuarios por criterio de busqueda
     * @param req 
     * @param res 
     */
    public async getUsersByLimit( req: Request, res: Response ): Promise<any> {}

    /**
     * Devuelve los usuarios por criterio de busqueda
     * @param req 
     * @param res 
     */
    public async getUserByEmail( req: Request, res: Response ): Promise<any> {}
    /**
     * Crea nuevos usuarios
     * @param req 
     * @param res 
     */
    public async createUser( req: Request, res: Response ): Promise<any> {}

    /**
     * Borra un nuevo usuario
     * @param req 
     * @param res 
     */
    public async deleteUser( req: Request, res: Response ): Promise<any> {}

    /**
     * Actualiza un nuevo usuario
     * @param req 
     * @param res 
     */
    public async updateUser( req: Request, res: Response ): Promise<any> {}

}
