// Http Petitions
import { Request, Response } from 'express';

// Database
import db from '../config/database';
// Classes
import { Establecimientos } from '../abstract_classes/establecimientos';
import { Server } from '../classes/server';


export class EstablecimientosController implements Establecimientos {

    // Genera una instancia de la clase EstablecimientosController
    private static establecimientosControllerInstance: EstablecimientosController;

    private constructor() {}

    /**
     * Regresa la instancia de la clase EstablecimientosController
     */
    public static get instanceEstablecimientosController() {
        return this.establecimientosControllerInstance || (this.establecimientosControllerInstance = new this());
    }

    /**
     * Crea un nuevo establecimiento
     * @param req 
     * @param res 
     */
    public async createEstablecimiento(req: Request, res: Response): Promise<any> {
        
        // Si llegan todos los parametros en la peticion
        if ( req.body ) {

            await db.func('create_establecimiento', [req.body.nombre, req.body.direccion, req.body.estado, req.body.imagen])
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
                            message: 'Ocurrió un error, no fue posible crear el establecimiento'
                        });
                    }
                })
                .catch( error => {
                    return res.json({
                        status: 'NOK',
                        code: 500,
                        message: 'Ocurrió un error, no fue posible crear el establecimiento'
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
     * Elimina un establecimiento
     * @param req 
     * @param res 
     */
    public async deleteEstablecimiento(req: Request, res: Response): Promise<any> {
        
        // Si llegan todos los parametros en la peticion
        if ( req.params ) {
            // Id del establecimiento
            const {id} = req.params;
            
            await db.func('delete_establecimiento', [id])
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
                            message: 'Ocurrió un error, no fue posible eliminar el establecimiento'
                        });
                    }
                })
                .catch( error => {
                    return res.json({
                        status: 'NOK',
                        code: 500,
                        message: 'Ocurrió un error, no fue posible eliminar el establecimiento'
                    });
                });
        } else {
            return res.json({
                status: 'NOK',
                code: 203,
                message: 'Falta el id en la petición'
            });
        }
    }

    /**
     * Actualiza un establecimiento
     * @param req 
     * @param res 
     */
    public async updateEstablecimiento(req: Request, res: Response): Promise<any> {
        
        // Si llegan todos los parametros en la peticion
        if ( req.body && req.params ) {

            // id del establecimiento
            const {id} = req.params;
            
            await db.func('update_establecimiento', [id, req.body.nombre, req.body.direccion, req.body.estado, req.body.imagen ])
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
                            message: 'Ocurrió un error, no fue posible actualizar el establecimiento'
                        });
                    }
                })
                .catch( error => {
                    return res.json({
                        status: 'NOK',
                        code: 500,
                        message: 'Ocurrió un error, no fue posible actualizar el establecimiento'
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