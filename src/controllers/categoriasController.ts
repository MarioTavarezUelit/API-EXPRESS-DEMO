// Http Petitions
import { Request, Response } from 'express';
// Classes
import { Categorias } from '../abstract_classes/categorias';
// Database
import db from '../config/database';
// Server
import { Server } from '../classes/server';

export class CategoriasController implements Categorias {

    // Crea instancia de la clase CategoriasController
    private static categoriasControllerInstance: CategoriasController;
    

    private constructor() {}

    /**
     * Devuelve la instancia de la clase CategoriasController
     */
    public static get instanceCategoriasController() {
        return this.categoriasControllerInstance || (this.categoriasControllerInstance = new this());
    }
    
    /**
     * Crea una nueva categoria
     * @param req 
     * @param res 
     */
    public async createCategoria(req: Request, res: Response): Promise<any> {
        
        // Si llegan todos los parametros
        if ( req.body ) {
            // Clase server
            const server = Server.instanceServer;

            await db.func('create_categoria', [req.body.descripcion, req.body.image])
                .then( response => {
                    // Si devuelve registros la funcion
                    if ( response.length > 0 ) {
                        server.io.emit('categorias-changes');

                        return res.json({
                            status: 'OK',
                            code: 200,
                            message: response
                        });
                    } else {

                        return res.json({
                            status: 'NOK',
                            code: 500,
                            message: 'Ocurrió un error, no fue posible crear la categoría'
                        });
                    }
                })
                .catch( error => {
                    return res.json({
                        status: 'NOK',
                        code: 500,
                        message: 'Ocurrió un error, no fue posible crear la categoría'
                    });
                });
        } else {
            return res.json({
                status: 'NOK',
                code: 203,
                message: 'Faltan los datos de la categoría'
            });
        }
    }

    /**
     * Elimina la categoria cambiando el status a Inactivo
     * @param req 
     * @param res 
     */
    public async deleteCategoria(req: Request, res: Response): Promise<any> {
        
        if ( req.params ) {

            const server = Server.instanceServer;

            // Recupera el id de la categoria
            const {id} = req.params;

            await db.func('delete_categoria', [id])
                .then( response => {
                    // Si devuelve registros la funcion
                    if ( response.length > 0 ) {
                        server.io.emit('categorias-changes');

                        return res.json({
                            status: 'OK',
                            code: 200,
                            message: response
                        });
                    } else {
                        return res.json({
                            status: 'NOK',
                            code: 500,
                            message: 'Ocurrió un error, no fue posible eliminar la categoría'
                        });
                    }
                })
                .catch( error => {
                    return res.json({
                        status: 'NOK',
                        code: 500,
                        message: 'Ocurrió un error, no fue posible eliminar la categoría'
                    });
                });
        } else {
            return res.json({
                status: 'NOK',
                code: 203,
                message: 'El id de la categoría es necesario'
            });
        }
    }

    /**
    * Actualiza la categoria
    * @param req 
    * @param res 
    */
    public async updateCategoria(req: Request, res: Response): Promise<any> {
        
        if ( req.params && req.body ) {
            // Clase Server
            const server = Server.instanceServer;
            // Id de la categoria
            const {id} = req.params;

            await db.func('update_categoria', [id, req.body.descripcion, req.body.image])
                .then( response => {
                    // Si devuelve registros la function
                    if ( response.length > 0 ) {

                        server.io.emit('categorias-changes');

                        return res.json({
                            status: 'OK',
                            code: 200,
                            message: response
                        });

                    } else {
                        return res.json({
                            status: 'NOK',
                            code: 500,
                            message: 'Ocurrió un error, no fue posible actualizar la categoría'
                        });
                    }
                })
                .catch( error => {
                    return res.json({
                        status: 'NOK',
                        code: 500,
                        message: 'Ocurrió un error, no fue posible actualizar la categoría'
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