// Http Petitions
import { Request, Response } from 'express';

export abstract class Categorias {

    /**
     * Crea una nueva categoria
     * @param req 
     * @param res 
     */
    public async createCategoria( req: Request, res: Response ): Promise<any> {}

    /**
     * Elimina la categoria cambiando el status a Inactivo
     * @param req 
     * @param res 
     */
    public async deleteCategoria( req: Request, res: Response ): Promise<any> {}

    /**
     * Actualiza la categoria
     * @param req 
     * @param res 
     */
    public async updateCategoria( req: Request, res: Response ): Promise<any> {}
}