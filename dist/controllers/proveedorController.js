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
const server_1 = require("../classes/server");
class ProveedorController {
    constructor() { }
    /**
     * Devuelve la instancia de la clase ProveedorController
     */
    static get instanceProveedorController() {
        return this.proveedorControllerInstance || (this.proveedorControllerInstance = new this());
    }
    /**
     * Devuelve a los proveedores por criterio de busqueda y limite
     * @param req
     * @param res
     */
    getProveedoresByLimit(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Si llegan todos los parametros en la peticion
            if (req.params) {
                // Parametros
                const { criteria, limit } = req.params;
                // Class Server
                const server = server_1.Server.instanceServer;
                yield database_1.default.func('get_proveedores_by_limit', [limit])
                    .then(response => {
                    // Si devuelve registros
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
                            message: `No se encontrarón registros`
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
                    message: 'Faltan datos en la petición'
                });
            }
        });
    }
    /**
     * Crea un nuevo proveedor
     * @param req
     * @param res
     */
    createProveedor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Si llegan todos los parametros en la peticion
            if (req.body) {
                // Class Server
                const server = server_1.Server.instanceServer;
                yield database_1.default.func('create_proveedor', [req.body.razonSocial, req.body.contacto, req.body.telefono,
                    req.body.email, req.body.direccion, req.body.estado,
                    req.body.establecimiento])
                    .then(response => {
                    // Si devuelve registros
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
                            code: 500,
                            message: 'Ocurrió un error, no fue posible crear al proveedor'
                        });
                    }
                })
                    .catch(error => {
                    return res.json({
                        status: 'NOK',
                        code: 500,
                        message: 'Ocurrió un error, no fue posible crear al proveedor'
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
    /**
     * Elimina a un proveedor
     * @param req
     * @param res
     */
    deleteProveedor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Si llegan todos los parametros en la peticion
            if (req.params) {
                // Class Server
                const server = server_1.Server.instanceServer;
                // Id del proveedor
                const { id } = req.params;
                yield database_1.default.func('delete_proveedor', [id])
                    .then(response => {
                    // Si devuelve registros
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
                            code: 500,
                            message: 'Ocurrió un error, no fue posible eliminar al proveedor'
                        });
                    }
                })
                    .catch(error => {
                    return res.json({
                        status: 'NOK',
                        code: 500,
                        message: 'Ocurrió un error, no fue posible eliminar al proveedor'
                    });
                });
            }
            else {
                return res.json({
                    status: 'NOK',
                    code: 203,
                    message: 'Falta el id del proveedor'
                });
            }
        });
    }
    /**
     * Actualiza a un proveedor
     * @param req
     * @param res
     */
    updateProveedor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Si llegan todos los parametros en la peticion
            if (req.body && req.params) {
                // Class Server
                const server = server_1.Server.instanceServer;
                // id del Proveedor
                const { id } = req.params;
                yield database_1.default.func('update_proveedor', [id, req.body.razon_social, req.body.contacto, req.body.telefono,
                    req.body.email, req.body.direccion, req.body.estado])
                    .then(response => {
                    // Si devuelve registros
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
                            code: 500,
                            message: 'Ocurrió un error, no fue posible a el esctualizar los datos del proveedor'
                        });
                    }
                })
                    .catch(error => {
                    return res.json({
                        status: 'NOK',
                        code: 500,
                        message: 'Ocurrió un error, no fue posible actualizar los datos del proveedor'
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
exports.ProveedorController = ProveedorController;
