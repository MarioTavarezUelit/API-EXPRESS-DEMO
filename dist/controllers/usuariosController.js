"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Postgres Database
const database_1 = __importDefault(require("../config/database"));
// Bcrypt
const bcrypt_1 = __importDefault(require("bcrypt"));
// Server
const server_1 = require("../classes/server");
class UsuariosController {
    constructor() { }
    // Devuelve una sola instancia de la clase UsuariosController
    static get instanceUsuarios() {
        return this.usuariosInstance || (this.usuariosInstance = new this());
    }
    /**
     * Devuelve todos los usuarios registrados
     * @param req
     * @param res
     */
    getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.func('get_users')
                .then(response => {
                // Si existen usuarios se envia la informacion
                if (response.length > 0) {
                    return res.json({
                        status: 'OK',
                        code: 200,
                        message: response
                    });
                }
                else {
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
        });
    }
    /**
     * Devuelve el usuario por id
     * @param req
     * @param res
     */
    getUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Si se envian los parametros
            if (req.params) {
                const { id } = req.params;
                yield database_1.default.func('get_user_by_id', [id])
                    .then(response => {
                    if (response.length > 0) {
                        return res.json({
                            status: 'OK',
                            code: 200,
                            message: response
                        });
                    }
                    else {
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
            }
            else {
                return res.json({
                    status: 'NOK',
                    code: 203,
                    message: 'Ingrese el id del usuario'
                });
            }
        });
    }
    /**
     * Devuelve los usuarios por criterio de busqueda
     * @param req
     * @param res
     */
    getUsersByCriteria(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.params) {
                const { criterio, limit } = req.params;
                yield database_1.default.func('get_users_by_criteria', [criterio, limit])
                    .then(response => {
                    if (response.length > 0) {
                        return res.json({
                            status: 'OK',
                            code: 200,
                            message: response
                        });
                    }
                    else {
                        return res.json({
                            status: 'NOK',
                            code: 204,
                            message: `No se encontraron usuarios bajo el criterio de búsqueda ${criterio}`
                        });
                    }
                })
                    .catch(error => {
                    return res.json({
                        status: 'NOK',
                        code: 500,
                        message: 'Ocurrió un error, no fue realizar el criterio de búsqueda'
                    });
                });
            }
            else {
                return res.json({
                    status: 'NOK',
                    code: 203,
                    message: 'Ingrese el criterio de búsqueda'
                });
            }
        });
    }
    /**
    * Devuelve los usuarios por criterio de busqueda
    * @param req
    * @param res
    */
    getUsersByLimit(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.params) {
                const { limit } = req.params;
                yield database_1.default.func('get_users_by_limit', [limit])
                    .then(response => {
                    if (response.length > 0) {
                        return res.json({
                            status: 'OK',
                            code: 200,
                            message: response
                        });
                    }
                    else {
                        return res.json({
                            status: 'NOK',
                            code: 204,
                            message: `No se encontraron usuarios`
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
            }
            else {
                return res.json({
                    status: 'NOK',
                    code: 203,
                    message: 'Ingrese el limite de registros'
                });
            }
        });
    }
    /**
     * Devuelve el usuario por email
     * @param req
     * @param res
     */
    getUserByEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.params) {
                const { email } = req.params;
                yield database_1.default.func('get_user_by_email', [email])
                    .then(response => {
                    if (response.length > 0) {
                        return res.json({
                            status: 'OK',
                            code: 200,
                            message: response
                        });
                    }
                    else {
                        return res.json({
                            status: 'NOK',
                            code: 204,
                            message: 'El usuario no existe'
                        });
                    }
                })
                    .catch(error => {
                    return res.json({
                        status: 'NOK',
                        code: 500,
                        message: 'Ocurrió un error, no fue posible obtener los datos del usuario'
                    });
                });
            }
            else {
                return res.json({
                    status: 'NOK',
                    code: 203,
                    message: 'El email es necesario'
                });
            }
        });
    }
    /**
     * Crear nuevos usuarios
     * @param req
     * @param res
     */
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Instancia de Server
            const server = server_1.Server.instanceServer;
            let hashCounts = 10;
            // Valida si viene el cuerpo de la peticion
            if (req.body) {
                // Hace el hash del password
                bcrypt_1.default.hash(req.body.password, hashCounts, (errorHash, hash) => {
                    // Validar si existe error al hacer hash
                    if (errorHash) {
                        return res.json({
                            status: 'NOK',
                            code: 500,
                            message: 'Error al realizar hash del password'
                        });
                    }
                    else {
                        // Obtiene el hash
                        const passwordHash = hash;
                        // Ejecuta la funcion create_usuarios_sales para crear el nuevo usuario
                        database_1.default.func('create_user', [req.body.nombre, req.body.apellido, req.body.perfil, req.body.email, passwordHash, req.body.image, req.body.id_establecimiento])
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
            }
            else {
                return res.json({
                    status: 'NOK',
                    code: 203,
                    message: 'Llene todos los datos del usuario'
                });
            }
        });
    }
    /**
     * Elimina un usuario
     * @param req
     * @param res
     */
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Instancia de Server
            const server = server_1.Server.instanceServer;
            // Valida si vienen los parametros de la peticion
            if (req.params) {
                const { id } = req.params;
                yield database_1.default.func('delete_user', [id])
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
            }
            else {
                return res.json({
                    status: 'NOK',
                    code: 203,
                    message: 'El id del usuario es necesario'
                });
            }
        });
    }
    /**
     * Actualiza un nuevo usuario
     * @param req
     * @param res
     */
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Instancia de Server
            const server = server_1.Server.instanceServer;
            // Valida si viene el cuerpo y los parametros de la peticion
            if (req.body && req.params) {
                const { id } = req.params;
                yield database_1.default.func('update_user', [id, req.body.nombre, req.body.apellido, req.body.perfil, req.body.email, req.body.image, req.body.id_establecimiento])
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
            }
            else {
                return res.json({
                    status: 'NOK',
                    code: 203,
                    message: 'Los datos del usuario son necesarios'
                });
            }
        });
    }
}
exports.UsuariosController = UsuariosController;
