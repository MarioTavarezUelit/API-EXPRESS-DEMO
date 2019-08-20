// Http Petitions
import { Request, Response } from 'express';
// Database
import db from '../config/database';
// Classes
import { Productos } from '../abstract_classes/productos';
// Server
import { Server } from '../classes/server';

export class ProductosController implements Productos {

    // Crea una instancia de la clase ProductosController
    private static productosControllerInstance: ProductosController;

    private constructor() {}

    /**
     *  Devuelve la instancia de la clase ProductosController
     */
    public static get instanceProductosController() {
        return this.productosControllerInstance || (this.productosControllerInstance = new this());
    }

    /**
     * Devuelve el producto por id
     * @param req 
     * @param res 
     */
    public async getProductoById(req: Request, res: Response): Promise<any> {

         // Si llegan todos los parametros en la peticion
         if ( req.params ) {

            const {id} = req.params;
            // Class Server
            const server = Server.instanceServer;
            
            await db.func('get_producto_by_id', [id])
                .then( response => {
                    // Si devuelve registros
                    if ( response.length > 0 ) {

                        return res.json({
                            status: 'OK',
                            code: 200,
                            message: response
                        });

                    } else {
                        return res.json({
                            status: 'NOK',
                            code: 204,
                            message: 'No existe el producto'
                        });
                    }
                })
                .catch( error => {
                    return res.json({
                        status: 'NOK',
                        code: 500,
                        message: 'Ocurrió un error, no fue posible realizar la consulta'
                    });
                });
        } else {
            return res.json({
                status: 'NOK',
                code: 203,
                message: 'Faltan el id del producto'
            });
        }
    }

    /**
     * Devuelve los productos por limite
     * @param req 
     * @param res 
     */
    public async getProductosByLimit(req: Request, res: Response): Promise<any> {

        // Si llegan todos los parametros en la peticion
        if ( req.params ) {

            const {limit} = req.params;
            // Class Server
            const server = Server.instanceServer;
            
            await db.func('get_productos_by_limit', [limit])
                .then( response => {
                    // Si devuelve registros
                    if ( response.length > 0 ) {

                        return res.json({
                            status: 'OK',
                            code: 200,
                            message: response
                        });

                    } else {
                        return res.json({
                            status: 'NOK',
                            code: 204,
                            message: `No se encontraron productos`
                        });
                    }
                })
                .catch( error => {
                    return res.json({
                        status: 'NOK',
                        code: 500,
                        message: 'Ocurrió un error, no fue posible realizar la consulta'
                    });
                });
        } else {
            return res.json({
                status: 'NOK',
                code: 203,
                message: 'Falta el criterio de búsqueda'
            });
        }
    }

    /**
     * Devuelve los productos por categoria
     * @param req 
     * @param res 
     */
    public async getProductosByCategoria(req: Request, res: Response): Promise<any> {

        // Si llegan todos los parametros en la peticion
        if ( req.params ) {

            const {categoria} = req.params;
            // Class Server
            const server = Server.instanceServer;
            
            await db.func('get_productos_by_categoria', [categoria])
                .then( response => {
                    // Si devuelve registros
                    if ( response.length > 0 ) {

                        return res.json({
                            status: 'OK',
                            code: 200,
                            message: response
                        });

                    } else {
                        return res.json({
                            status: 'NOK',
                            code: 204,
                            message: `No se encontraron productos con esta categoría`
                        });
                    }
                })
                .catch( error => {
                    return res.json({
                        status: 'NOK',
                        code: 500,
                        message: 'Ocurrió un error, no fue posible realizar la consulta'
                    });
                });
        } else {
            return res.json({
                status: 'NOK',
                code: 203,
                message: 'Falta la categoría del producto'
            });
        }
    }

    /**
     * Crea un nuevo producto
     * @param req 
     * @param res 
     */
    public async createProducto(req: Request, res: Response): Promise<any> {
        // Si llegan todos los parametros en la peticion
        if ( req.body ) {

            // Class Server
            const server = Server.instanceServer;
            
            await db.func('create_producto', [req.body.nombre, req.body.proveedor, req.body.categoria, req.body.imagen,
                                              req.body.medida, req.body.unidad, req.body.precio, req.body.precioProveedor,
                                              req.body.almacen,
                                              req.body.barcode])
                .then( response => {
                    // Si devuelve registros
                    if ( response.length > 0 ) {

                        return res.json({
                            status: 'OK',
                            code: 200,
                            message: response
                        });

                    } else {
                        return res.json({
                            status: 'NOK',
                            code: 500,
                            message: 'Ocurrió un error, no fue posible crear el producto'
                        });
                    }
                })
                .catch( error => {
                    return res.json({
                        status: 'NOK',
                        code: 500,
                        message: 'Ocurrió un error, no fue posible crear el producto'
                    });
                });
        } else {
            return res.json({
                status: 'NOK',
                code: 203,
                message: 'Faltan datos en la petición'
            });
        }
    }

    /**
     * Elimina un producto
     * @param req 
     * @param res 
     */
    public async deleteProducto(req: Request, res: Response): Promise<any> {
        
        // Si llegan todos los parametros en la peticion
        if ( req.params ) {

            // Id del producto
            const {id} = req.params;
            // Class Server
            const server = Server.instanceServer;
            
            await db.func('delete_producto', [id])
                .then( response => {
                    // Si devuelve registros
                    if ( response.length > 0 ) {

                        return res.json({
                            status: 'OK',
                            code: 200,
                            message: response
                        });

                    } else {
                        return res.json({
                            status: 'NOK',
                            code: 500,
                            message: 'Ocurrió un error, no fue posible eliminar el producto'
                        });
                    }
                })
                .catch( error => {
                    return res.json({
                        status: 'NOK',
                        code: 500,
                        message: 'Ocurrió un error, no fue posible eliminar el producto'
                    });
                });
        } else {
            return res.json({
                status: 'NOK',
                code: 203,
                message: 'Faltan datos en la petición'
            });
        }
    }

    /**
     * Actualiza un producto
     * @param req 
     * @param res 
     */
    public async updateProducto(req: Request, res: Response): Promise<any> {
        
        // Si llegan todos los parametros en la peticion
        if ( req.params && req.body ) {

            // Id del producto
            const {id} = req.params;
            // Class Server
            const server = Server.instanceServer;
            
            await db.func('update_producto', [id, req.body.nombre, req.body.proveedor, req.body.categoria, req.body.imagen,
                                              req.body.medida, req.body.unidad, req.body.precio, req.body.precioProveedor,
                                              req.body.volStock, req.body.almacen,
                                              req.body.barcode])
                .then( response => {
                    // Si devuelve registros
                    if ( response.length > 0 ) {

                        return res.json({
                            status: 'OK',
                            code: 200,
                            message: response
                        });

                    } else {
                        return res.json({
                            status: 'NOK',
                            code: 500,
                            message: 'Ocurrió un error, no fue posible actualizar la información del producto'
                        });
                    }
                })
                .catch( error => {
                    return res.json({
                        status: 'NOK',
                        code: 500,
                        message: 'Ocurrió un error, no fue posible actualizar la información del producto'
                    });
                });
        } else {
            return res.json({
                status: 'NOK',
                code: 203,
                message: 'Faltan datos en la petición'
            });
        }
    }
}