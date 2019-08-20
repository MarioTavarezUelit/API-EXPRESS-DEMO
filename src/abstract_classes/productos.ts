// Http Petitions
import { Request, Response } from 'express';

export abstract class Productos {


    /**
     * Devuelve el producto por id
     * @param req 
     * @param res 
     */
    public async getProductoById( req: Request, res: Response ): Promise<any> {}

    /**
     * Devuelve los productos por limite
     * @param req 
     * @param res 
     */
    public async getProductosByLimit( req: Request, res: Response ): Promise<any> {}

    /**
     * Devuelve los productos por categoria
     * @param req 
     * @param res 
     */
    public async getProductosByCategoria( req: Request, res: Response ): Promise<any> {}

    /**
     * Crea un nuevo producto
     * @param req 
     * @param res 
     */
    public async createProducto( req: Request, res: Response ): Promise<any> {}

    /**
     * Elimina un producto
     * @param req 
     * @param res 
     */
    public async deleteProducto( req: Request, res: Response ): Promise<any> {}

    /**
     * Actualiza un producto
     * @param req 
     * @param res 
     */
    public async updateProducto( req: Request, res: Response ): Promise<any> {}

}