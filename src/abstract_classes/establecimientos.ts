// Http Petitions
import { Request, Response } from 'express';

export abstract class Establecimientos {

    /**
     * Crea un nuevo establecimiento
     * @param req 
     * @param res 
     */
    public async createEstablecimiento( req: Request, res: Response ): Promise<any> {}

    /**
     * Elimina un establecimiento
     * @param req 
     * @param res 
     */
    public async deleteEstablecimiento( req: Request, res: Response ): Promise<any> {}

    /**
     * Actualiza un establecimiento
     * @param req 
     * @param res 
     */
    public async updateEstablecimiento( req: Request, res: Response ): Promise<any> {}

}