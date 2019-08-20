// Peticiones HTTP
import { Request, Response } from 'express';
// Postgres Database
import db from '../config/database';
// Bcrypt
import bcrypt from 'bcrypt';
// Server
import { Server } from '../classes/server';
// Abstract Class
import { Usuarios } from '../abstract_classes/usuarios';
// Token
import { Token } from '../classes/token';
// Classes
import { Mail } from '../classes/mail';

export class UsuariosController implements Usuarios {
    
    // Instancia de tipo UsuariosController
    private static usuariosInstance: UsuariosController;

    private constructor() { }

    // Devuelve una sola instancia de la clase UsuariosController
    public static get instanceUsuarios(): Usuarios {

        return this.usuariosInstance || (this.usuariosInstance = new this());
    }

    /**
     * Devuelve todos los usuarios registrados
     * @param req 
     * @param res 
     */
    public async getAllUsers(req: Request, res: Response): Promise<any> {

        await db.func('get_users')
            .then(response => {
                // Si existen usuarios se envia la informacion
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
                        message: 'No existen usuarios'
                    });
                }
            })
            .catch(error => {
                return res.json({
                    status: 'NOK',
                    code: 500,
                    message: 'Ocurrió un error, intentelo nuevamente'
                });
            });
    }

    /**
     * Devuelve el usuario por id
     * @param req 
     * @param res 
     */
    public async getUserById(req: Request, res: Response): Promise<any> {
        // Si se envian los parametros
        if (req.params) {
            const { id } = req.params;

            await db.func('get_user_by_id', [id])
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
                            message: 'No existe el usuario'
                        });
                    }
                })
                .catch(error => {
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
                message: 'Ingrese el id del usuario'
            });
        }
    }

    /**
     * Devuelve los usuarios por criterio de busqueda
     * @param req 
     * @param res 
     */
    public async getUsersByCriteria(req: Request, res: Response): Promise<any> {
        
        if ( req.params ) {
            const {criterio, limit} = req.params;
            await db.func('get_users_by_criteria', [criterio, limit])
                .then( response => {
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
                            message: `No se encontraron usuarios bajo el criterio de búsqueda ${criterio}`
                        });
                    }
                })
                .catch( error => {
                    return res.json({
                        status: 'NOK',
                        code: 500,
                        message: 'Ocurrió un error, no fue realizar el criterio de búsqueda'
                    });
                });
        } else {
            return res.json({
                status: 'NOK',
                code: 203,
                message: 'Ingrese el criterio de búsqueda'
            });
        }
    }

     /**
     * Devuelve los usuarios por criterio de busqueda
     * @param req 
     * @param res 
     */
    public async getUsersByLimit(req: Request, res: Response): Promise<any> {
        
        if ( req.params ) {
            const {limit} = req.params;
            await db.func('get_users_by_limit', [limit])
                .then( response => {
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
                            message: `No se encontraron usuarios`
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
                message: 'Ingrese el limite de registros'
            });
        }
    }

    /**
     * Devuelve el usuario por email
     * @param req 
     * @param res 
     */
    public async getUserByEmail( req: Request, res: Response ): Promise<any> {

        if ( req.params ) {

            const { email } = req.params;

            await db.func('get_user_by_email', [email])
                .then( response => {
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
                            message: 'El usuario no existe'
                        });
                    }
                })
                .catch( error => {
                    return res.json({
                        status: 'NOK',
                        code: 500,
                        message: 'Ocurrió un error, no fue posible obtener los datos del usuario'
                    });
                });
        } else {
            return res.json({
                status: 'NOK',
                code: 203,
                message: 'El email es necesario'
            });
        }

    }

    /**
     * Crear nuevos usuarios
     * @param req 
     * @param res 
     */
    public async createUser(req: Request, res: Response): Promise<any> {

        // Instancia de Server
        const server = Server.instanceServer;

        let hashCounts = 10;
        // Valida si viene el cuerpo de la peticion
        if (req.body) {
            // Hace el hash del password
            bcrypt.hash(req.body.password, hashCounts, (errorHash, hash) => {
                // Validar si existe error al hacer hash
                if (errorHash) {
                    return res.json({
                        status: 'NOK',
                        code: 500,
                        message: 'Error al realizar hash del password'
                    });
                } else {
                    // Obtiene el hash
                    const passwordHash = hash;
                    // Ejecuta la funcion create_usuarios_sales para crear el nuevo usuario
                    db.func('create_user', [req.body.nombre, req.body.apellido, req.body.perfil, req.body.email, passwordHash, req.body.image, req.body.id_establecimiento])
                        .then(response => {

                            // Envia el payload mediante socket al canal usuarios-creados
                            server.io.emit('usuarios-changes', response);

                            return res.json({
                                status: 'OK',
                                code: 201,
                                message: 'Usuario creado correctamente'
                            });
                        })
                        .catch(error => {
                            return res.json({
                                status: 'NOK',
                                code: 500,
                                message: 'Ocurrió un error, no fué posible crear el usuario'
                            });
                        });
                }
            });

        } else {
            return res.json({
                status: 'NOK',
                code: 203,
                message: 'Llene todos los datos del usuario'
            });
        }
    }

    /**
     * Elimina un usuario
     * @param req 
     * @param res 
     */
    public async deleteUser(req: Request, res: Response) {

        // Instancia de Server
        const server = Server.instanceServer;

        // Valida si vienen los parametros de la peticion
        if (req.params) {
            const { id } = req.params;

            await db.func('delete_user', [id])
                .then(response => {
                    // Envia el payload mediante socket al canal usuarios-creados
                    server.io.emit('usuarios-changes', response);

                    return res.json({
                        status: 'OK',
                        code: 200,
                        message: response
                    });
                })
                .catch(error => {
                    return res.json({
                        status: 'NOK',
                        code: 500,
                        message: 'Ocurrió un error, no fue posible eliminar el usuario'
                    });
                });
        } else {
            return res.json({
                status: 'NOK',
                code: 203,
                message: 'El id del usuario es necesario'
            });
        }
    }

    /**
     * Actualiza un nuevo usuario
     * @param req 
     * @param res 
     */
    public async updateUser(req: Request, res: Response): Promise<any> {

        // Instancia de Server
        const server = Server.instanceServer;

        // Valida si viene el cuerpo y los parametros de la peticion
        if (req.body && req.params) {
            const { id } = req.params;

            await db.func('update_user', [id, req.body.nombre, req.body.apellido, req.body.perfil, req.body.email, req.body.image, req.body.id_establecimiento])
                .then(response => {

                    // Envia el payload mediante socket al canal usuarios-creados
                    server.io.emit('usuarios-changes', response);

                    return res.json({
                        status: 'OK',
                        code: 200,
                        message: response
                    });
                })
                .catch(error => {
                    return res.json({
                        status: 'NOK',
                        code: 500,
                        message: 'Ocurrió un error, no fue posible actualizar los datos del usuario'
                    });
                });
        } else {
            return res.json({
                status: 'NOK',
                code: 203,
                message: 'Los datos del usuario son necesarios'
            });
        }
    }
}