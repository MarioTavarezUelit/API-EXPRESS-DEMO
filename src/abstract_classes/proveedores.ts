// Http Petitions
import { Request, Response } from 'express';

export class Proveedores {

    /**
     * Devuelve a los proveedores por criterio de busqueda y limite
     * @param req 
     * @param res 
     */
    public async getProveedoresByLimit( req: Request, res: Response ): Promise<any> {}

    /**
     * Crea un nuevo proveedor
     * @param req 
     * @param res 
     */
    public async createProveedor( req: Request, res: Response ): Promise<any> {}

    /**
     * Elimina a un proveedor
     * @param req 
     * @param res 
     */
    public async deleteProveedor( req: Request, res: Response ): Promise<any> {}

    /**
     * Actualiza a un proveedor
     * @param req 
     * @param res 
     */
    public async updateProveedor( req: Request, res: Response ): Promise<any> {}
}