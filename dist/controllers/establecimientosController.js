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
class EstablecimientosController {
    constructor() { }
    /**
     * Regresa la instancia de la clase EstablecimientosController
     */
    static get instanceEstablecimientosController() {
        return this.establecimientosControllerInstance || (this.establecimientosControllerInstance = new this());
    }
    /**
     * Crea un nuevo establecimiento
     * @param req
     * @param res
     */
    createEstablecimiento(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Si llegan todos los parametros en la peticion
            if (req.body) {
                yield database_1.default.func('create_establecimiento', [req.body.nombre, req.body.direccion, req.body.estado, req.body.imagen])
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
                            message: 'Ocurrió un error, no fue posible crear el establecimiento'
                        });
                    }
                })
                    .catch(error => {
                    return res.json({
                        status: 'NOK',
                        code: 500,
                        message: 'Ocurrió un error, no fue posible crear el establecimiento'
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
     * Elimina un establecimiento
     * @param req
     * @param res
     */
    deleteEstablecimiento(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Si llegan todos los parametros en la peticion
            if (req.params) {
                // Id del establecimiento
                const { id } = req.params;
                yield database_1.default.func('delete_establecimiento', [id])
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
                            message: 'Ocurrió un error, no fue posible eliminar el establecimiento'
                        });
                    }
                })
                    .catch(error => {
                    return res.json({
                        status: 'NOK',
                        code: 500,
                        message: 'Ocurrió un error, no fue posible eliminar el establecimiento'
                    });
                });
            }
            else {
                return res.json({
                    status: 'NOK',
                    code: 203,
                    message: 'Falta el id en la petición'
                });
            }
        });
    }
    /**
     * Actualiza un establecimiento
     * @param req
     * @param res
     */
    updateEstablecimiento(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Si llegan todos los parametros en la peticion
            if (req.body && req.params) {
                // id del establecimiento
                const { id } = req.params;
                yield database_1.default.func('update_establecimiento', [id, req.body.nombre, req.body.direccion, req.body.estado, req.body.imagen])
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
                            message: 'Ocurrió un error, no fue posible actualizar el establecimiento'
                        });
                    }
                })
                    .catch(error => {
                    return res.json({
                        status: 'NOK',
                        code: 500,
                        message: 'Ocurrió un error, no fue posible actualizar el establecimiento'
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
exports.EstablecimientosController = EstablecimientosController;
