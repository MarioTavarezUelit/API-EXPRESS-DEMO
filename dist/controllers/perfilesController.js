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
class PerfilesController {
    constructor() { }
    /**
     * Devuelve la instancia de los perfiles
     */
    static get instancePerfil() {
        return this.perfilInstance || (this.perfilInstance = new this());
    }
    /**
     *  Devuelve todos los perfiles
     * @param req
     * @param res
     */
    getAllPerfiles(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.any(`SELECT id, descripcion, status, create_at
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
                }
                else {
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
        });
    }
    /**
     * Crea un nuevo perfil
     * @param req
     * @param res
     */
    createPerfil(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Si vienen todos los parametros
            if (req.body) {
                yield database_1.default.func('create_perfil', [req.body.nombre])
                    .then(response => {
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
                        message: error
                    });
                });
            }
            else {
                return res.json({
                    status: 'NOK',
                    code: 203,
                    message: 'Llene todos los datos del perfil'
                });
            }
        });
    }
    /**
     * Elimina un perfil
     * @param req
     * @param res
     */
    deletePerfil(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Si vienen todos los parametros
            if (req.params) {
                const { id } = req.params;
                yield database_1.default.func('delete_perfil', [id])
                    .then(response => {
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
                        message: 'Ocurrió un error, no fue posible eliminar el perfil'
                    });
                });
            }
            else {
                return res.json({
                    status: 'NOK',
                    code: 203,
                    message: 'Es necesario el id del perfil'
                });
            }
        });
    }
    /**
     * Actualiza un perfil
     * @param req
     * @param res
     */
    updatePerfil(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Si vienen todos los parametros
            if (req.body) {
                const { id } = req.params;
                yield database_1.default.func('update_perfil', [id, req.body.nombre])
                    .then(response => {
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
                        message: error
                    });
                });
            }
            else {
                return res.json({
                    status: 'NOK',
                    code: 203,
                    message: 'Llene todos los datos del perfil'
                });
            }
        });
    }
}
exports.PerfilesController = PerfilesController;
