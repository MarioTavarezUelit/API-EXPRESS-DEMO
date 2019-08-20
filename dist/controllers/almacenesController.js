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
class AlmacenesController {
    constructor() { }
    /**
     * Devuelve la instancia de la clase AlmacenesController
     */
    static get instanceAlmacenesController() {
        return this.almacenesControllerInstance || (this.almacenesControllerInstance = new this());
    }
    /**
     * Crea un nuevo almacen
     * @param req
     * @param res
     */
    createAlmacen(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Si llegan todos los parametros en la peticion
            if (req.body) {
                yield database_1.default.func('create_almacen', [req.body.establecimiento])
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
                            message: 'Ocurrió un error, no fue posible crear el almácen'
                        });
                    }
                })
                    .catch(error => {
                    return res.json({
                        status: 'NOK',
                        code: 500,
                        message: 'Ocurrió un error, no fue posible crear el almácen'
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
     * Elimina un almacen
     * @param req
     * @param res
     */
    deleteAlmacen(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Si llegan todos los parametros en la peticion
            if (req.params) {
                const { id } = req.params;
                yield database_1.default.func('delete_almacen', [id])
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
                            message: 'Ocurrió un error, no fue posible eliminar el emácen'
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
            else {
                return res.json({
                    status: 'NOK',
                    code: 203,
                    message: 'Falta el id del almácen'
                });
            }
        });
    }
}
exports.AlmacenesController = AlmacenesController;
