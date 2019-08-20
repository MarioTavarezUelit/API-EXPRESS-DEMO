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
// Database
const database_1 = __importDefault(require("../config/database"));
// Server
const server_1 = require("../classes/server");
class CategoriasController {
    constructor() { }
    /**
     * Devuelve la instancia de la clase CategoriasController
     */
    static get instanceCategoriasController() {
        return this.categoriasControllerInstance || (this.categoriasControllerInstance = new this());
    }
    /**
     * Crea una nueva categoria
     * @param req
     * @param res
     */
    createCategoria(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Si llegan todos los parametros
            if (req.body) {
                // Clase server
                const server = server_1.Server.instanceServer;
                yield database_1.default.func('create_categoria', [req.body.descripcion, req.body.image])
                    .then(response => {
                    // Si devuelve registros la funcion
                    if (response.length > 0) {
                        server.io.emit('categorias-changes');
                        return res.json({
                            status: 'OK',
                            code: 200,
                            message: response
                        });
                    }
                    else {
                        return res.json({
                            status: 'NOK',
                            code: 500,
                            message: 'Ocurrió un error, no fue posible crear la categoría'
                        });
                    }
                })
                    .catch(error => {
                    return res.json({
                        status: 'NOK',
                        code: 500,
                        message: 'Ocurrió un error, no fue posible crear la categoría'
                    });
                });
            }
            else {
                return res.json({
                    status: 'NOK',
                    code: 203,
                    message: 'Faltan los datos de la categoría'
                });
            }
        });
    }
    /**
     * Elimina la categoria cambiando el status a Inactivo
     * @param req
     * @param res
     */
    deleteCategoria(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.params) {
                const server = server_1.Server.instanceServer;
                // Recupera el id de la categoria
                const { id } = req.params;
                yield database_1.default.func('delete_categoria', [id])
                    .then(response => {
                    // Si devuelve registros la funcion
                    if (response.length > 0) {
                        server.io.emit('categorias-changes');
                        return res.json({
                            status: 'OK',
                            code: 200,
                            message: response
                        });
                    }
                    else {
                        return res.json({
                            status: 'NOK',
                            code: 500,
                            message: 'Ocurrió un error, no fue posible eliminar la categoría'
                        });
                    }
                })
                    .catch(error => {
                    return res.json({
                        status: 'NOK',
                        code: 500,
                        message: 'Ocurrió un error, no fue posible eliminar la categoría'
                    });
                });
            }
            else {
                return res.json({
                    status: 'NOK',
                    code: 203,
                    message: 'El id de la categoría es necesario'
                });
            }
        });
    }
    /**
    * Actualiza la categoria
    * @param req
    * @param res
    */
    updateCategoria(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.params && req.body) {
                // Clase Server
                const server = server_1.Server.instanceServer;
                // Id de la categoria
                const { id } = req.params;
                yield database_1.default.func('update_categoria', [id, req.body.descripcion, req.body.image])
                    .then(response => {
                    // Si devuelve registros la function
                    if (response.length > 0) {
                        server.io.emit('categorias-changes');
                        return res.json({
                            status: 'OK',
                            code: 200,
                            message: response
                        });
                    }
                    else {
                        return res.json({
                            status: 'NOK',
                            code: 500,
                            message: 'Ocurrió un error, no fue posible actualizar la categoría'
                        });
                    }
                })
                    .catch(error => {
                    return res.json({
                        status: 'NOK',
                        code: 500,
                        message: 'Ocurrió un error, no fue posible actualizar la categoría'
                    });
                });
            }
            else {
                return res.json({
                    status: 'NOK',
                    code: 203,
                    message: 'Faltan datos en la petición'
                });
            }
        });
    }
}
exports.CategoriasController = CategoriasController;
