// HTTP Petitions
import { Request, Response } from 'express';

// Postgres Database
import db from '../config/database';

export class PerfilesController {

    // Crea la instancia de perfiles
    private static perfilInstance: PerfilesController;

    private constructor() { }

    /**
     * Devuelve la instancia de los perfiles
     */
    public static get instancePerfil() {
        return this.perfilInstance || (this.perfilInstance = new this());
    }

    /**
     *  Devuelve todos los perfiles
     * @param req 
     * @param res 
     */
    public async getAllPerfiles(req: Request, res: Response): Promise<any> {

        await db.any(`SELECT id, descripcion, status, create_at
                      FROM PERFILES
                      WHERE status = $1
                      ORDER BY 2`, ['Activo'])
            .then(response => {
                if (response.length > 0) {
                    return res.json({
                        status: 'OK',
                        code: 200,
                        message: response
                    });
                } else {
                    return res.json({
                        status: 'NOK',
                        code: 204,
                        message: 'No existen perfiles'
                    });
                }
            })
            .catch(error => {
                return res.json({
                    status: 'NOK',
                    code: 500,
                    message: error
                });
            });

    }

    /**
     * Crea un nuevo perfil
     * @param req 
     * @param res 
     */
    public async createPerfil( req: Request, res: Response ): Promise<any> {
        // Si vienen todos los parametros
        if (req.body) {
            await db.func('create_perfil', [req.body.nombre])
            .then( response => {
                return res.json({
                    status: 'OK',
                    code: 200,
                    message: response
                });
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
                message: 'Llene todos los datos del perfil'
            });
        }
    }
    /**
     * Elimina un perfil
     * @param req 
     * @param res 
     */
    public async deletePerfil( req: Request, res: Response ): Promise<any> {
        // Si vienen todos los parametros
        if (req.params) {
            const {id} = req.params;

            await db.func('delete_perfil', [id])
                .then( response => {
                    return res.json({
                        status: 'OK',
                        code: 200,
                        message: response
                    });
                })
                .catch( error => {
                    return res.json({
                        status: 'NOK',
                        code: 500,
                        message: 'Ocurrió un error, no fue posible eliminar el perfil'
                    });
                });

        } else {
            return res.json({
                status: 'NOK',
                code: 203,
                message: 'Es necesario el id del perfil'
            });
        }
    }
    /**
     * Actualiza un perfil
     * @param req 
     * @param res 
     */
    public async updatePerfil( req: Request, res: Response ) {
        // Si vienen todos los parametros
        if (req.body) {

            const {id} = req.params;

            await db.func('update_perfil', [id, req.body.nombre])
                .then( response => {
                    return res.json({
                        status: 'OK',
                        code: 200,
                        message: response
                    });
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
                message: 'Llene todos los datos del perfil'
            });
        }
    }
}