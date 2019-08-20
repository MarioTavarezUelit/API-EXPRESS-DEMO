// Http Petitions
import { Request, Response } from 'express';
// Database
import db from '../config/database';
// Classes
import { Proveedores } from '../abstract_classes/proveedores';
import { Server } from '../classes/server';

export class ProveedorController implements Proveedores {

    // Crea instancia de la clase ProveedorController
    private static proveedorControllerInstance: ProveedorController;

    private constructor() {}

    /**
     * Devuelve la instancia de la clase ProveedorController
     */
    public static get instanceProveedorController() {
        return this.proveedorControllerInstance || (this.proveedorControllerInstance = new this());
    }

    /**
     * Devuelve a los proveedores por criterio de busqueda y limite
     * @param req 
     * @param res 
     */
    public async getProveedoresByLimit(req: Request, res: Response): Promise<any> {
        // Si llegan todos los parametros en la peticion
        if ( req.params ) {

            // Parametros
            const {criteria, limit} = req.params;
            // Class Server
            const server = Server.instanceServer;
            
            await db.func('get_proveedores_by_limit', [limit])
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
                            message: `No se encontrarón registros`
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
                message: 'Faltan datos en la petición'
            });
        }
    }

    /**
     * Crea un nuevo proveedor
     * @param req 
     * @param res 
     */
    public async createProveedor(req: Request, res: Response): Promise<any> {
       
         // Si llegan todos los parametros en la peticion
         if ( req.body ) {

            // Class Server
            const server = Server.instanceServer;
            
            await db.func('create_proveedor', [req.body.razonSocial, req.body.contacto, req.body.telefono, 
                                               req.body.email, req.body.direccion, req.body.estado,
                                               req.body.establecimiento])
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
                            message: 'Ocurrió un error, no fue posible crear al proveedor'
                        });
                    }
                })
                .catch( error => {
                    return res.json({
                        status: 'NOK',
                        code: 500,
                        message: 'Ocurrió un error, no fue posible crear al proveedor'
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
     * Elimina a un proveedor
     * @param req 
     * @param res 
     */
    public async deleteProveedor(req: Request, res: Response): Promise<any> {

         // Si llegan todos los parametros en la peticion
         if ( req.params ) {

            // Class Server
            const server = Server.instanceServer;
            // Id del proveedor
            const {id} = req.params;
            
            await db.func('delete_proveedor', [id])
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
                            message: 'Ocurrió un error, no fue posible eliminar al proveedor'
                        });
                    }
                })
                .catch( error => {
                    return res.json({
                        status: 'NOK',
                        code: 500,
                        message: 'Ocurrió un error, no fue posible eliminar al proveedor'
                    });
                });
        } else {
            return res.json({
                status: 'NOK',
                code: 203,
                message: 'Falta el id del proveedor'
            });
        }
    }

    /**
     * Actualiza a un proveedor
     * @param req 
     * @param res 
     */
    public async updateProveedor(req: Request, res: Response): Promise<any> {

         // Si llegan todos los parametros en la peticion
         if ( req.body && req.params ) {

            // Class Server
            const server = Server.instanceServer;
            // id del Proveedor
            const {id} = req.params;
            
            await db.func('update_proveedor', [id, req.body.razon_social, req.body.contacto, req.body.telefono,
                                               req.body.email, req.body.direccion, req.body.estado])
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
                            message: 'Ocurrió un error, no fue posible a el esctualizar los datos del proveedor'
                        });
                    }
                })
                .catch( error => {
                    return res.json({
                        status: 'NOK',
                        code: 500,
                        message: 'Ocurrió un error, no fue posible actualizar los datos del proveedor'
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