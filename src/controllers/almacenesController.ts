// Http Petitions
import { Request, Response } from 'express';
// Database
import db from '../config/database';
// Classes
import { Almacenes } from '../abstract_classes/almacenes';

export class AlmacenesController implements Almacenes {

    // Crea la instancia de la clase AlmacenesController
    private static almacenesControllerInstance: AlmacenesController;

    private constructor() {}

    /**
     * Devuelve la instancia de la clase AlmacenesController
     */
    public static get instanceAlmacenesController() {
        return this.almacenesControllerInstance || (this.almacenesControllerInstance = new this());
    }

    /**
     * Crea un nuevo almacen
     * @param req 
     * @param res 
     */
    public async createAlmacen(req: Request, res: Response): Promise<any> {
        // Si llegan todos los parametros en la peticion
        if ( req.body ) {

            await db.func('create_almacen', [req.body.establecimiento])
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
                            message: 'Ocurrió un error, no fue posible crear el almácen'
                        });
                    }
                })
                .catch( error => {
                    return res.json({
                        status: 'NOK',
                        code: 500,
                        message: 'Ocurrió un error, no fue posible crear el almácen'
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
     * Elimina un almacen
     * @param req 
     * @param res 
     */
    public async deleteAlmacen(req: Request, res: Response): Promise<any> {

         // Si llegan todos los parametros en la peticion
         if ( req.params ) {

            const {id} = req.params;

            await db.func('delete_almacen', [id])
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
                            message: 'Ocurrió un error, no fue posible eliminar el emácen'
                        });
                    }
                })
                .catch( error => {
                    return res.json({
                        status: 'NOK',
                        code: 500,
                        message: error
                    });
                });
        } else {
            return res.json({
                status: 'NOK',
                code: 203,
                message: 'Falta el id del almácen'
            });
        }
    }


}
