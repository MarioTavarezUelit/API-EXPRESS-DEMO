// Http Petitions
import { Request, Response } from 'express';

export abstract class Almacenes {

    /**
     * Crea un nuevo almacen
     * @param req 
     * @param res 
     */
    public async createAlmacen( req: Request, res: Response ): Promise<any> {}

    /**
     * Elimina un almacen
     * @param req 
     * @param res 
     */
    public async deleteAlmacen( req: Request, res: Response ): Promise<any> {}

}