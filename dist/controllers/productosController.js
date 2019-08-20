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
class ProductosController {
    constructor() { }
    /**
     *  Devuelve la instancia de la clase ProductosController
     */
    static get instanceProductosController() {
        return this.productosControllerInstance || (this.productosControllerInstance = new this());
    }
    /**
     * Devuelve el producto por id
     * @param req
     * @param res
     */
    getProductoById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Si llegan todos los parametros en la peticion
            if (req.params) {
                const { id } = req.params;
                // Class Server
                const server = server_1.Server.instanceServer;
                yield database_1.default.func('get_producto_by_id', [id])
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
                            message: 'No existe el producto'
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
                    message: 'Faltan el id del producto'
                });
            }
        });
    }
    /**
     * Devuelve los productos por limite
     * @param req
     * @param res
     */
    getProductosByLimit(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Si llegan todos los parametros en la peticion
            if (req.params) {
                const { limit } = req.params;
                // Class Server
                const server = server_1.Server.instanceServer;
                yield database_1.default.func('get_productos_by_limit', [limit])
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
                            message: `No se encontraron productos`
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
                    message: 'Falta el criterio de búsqueda'
                });
            }
        });
    }
    /**
     * Devuelve los productos por categoria
     * @param req
     * @param res
     */
    getProductosByCategoria(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Si llegan todos los parametros en la peticion
            if (req.params) {
                const { categoria } = req.params;
                // Class Server
                const server = server_1.Server.instanceServer;
                yield database_1.default.func('get_productos_by_categoria', [categoria])
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
                            message: `No se encontraron productos con esta categoría`
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
                    message: 'Falta la categoría del producto'
                });
            }
        });
    }
    /**
     * Crea un nuevo producto
     * @param req
     * @param res
     */
    createProducto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Si llegan todos los parametros en la peticion
            if (req.body) {
                // Class Server
                const server = server_1.Server.instanceServer;
                yield database_1.default.func('create_producto', [req.body.nombre, req.body.proveedor, req.body.categoria, req.body.imagen,
                    req.body.medida, req.body.unidad, req.body.precio, req.body.precioProveedor,
                    req.body.almacen,
                    req.body.barcode])
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
                            message: 'Ocurrió un error, no fue posible crear el producto'
                        });
                    }
                })
                    .catch(error => {
                    return res.json({
                        status: 'NOK',
                        code: 500,
                        message: 'Ocurrió un error, no fue posible crear el producto'
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
     * Elimina un producto
     * @param req
     * @param res
     */
    deleteProducto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Si llegan todos los parametros en la peticion
            if (req.params) {
                // Id del producto
                const { id } = req.params;
                // Class Server
                const server = server_1.Server.instanceServer;
                yield database_1.default.func('delete_producto', [id])
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
                            message: 'Ocurrió un error, no fue posible eliminar el producto'
                        });
                    }
                })
                    .catch(error => {
                    return res.json({
                        status: 'NOK',
                        code: 500,
                        message: 'Ocurrió un error, no fue posible eliminar el producto'
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
     * Actualiza un producto
     * @param req
     * @param res
     */
    updateProducto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Si llegan todos los parametros en la peticion
            if (req.params && req.body) {
                // Id del producto
                const { id } = req.params;
                // Class Server
                const server = server_1.Server.instanceServer;
                yield database_1.default.func('update_producto', [id, req.body.nombre, req.body.proveedor, req.body.categoria, req.body.imagen,
                    req.body.medida, req.body.unidad, req.body.precio, req.body.precioProveedor,
                    req.body.volStock, req.body.almacen,
                    req.body.barcode])
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
                            message: 'Ocurrió un error, no fue posible actualizar la información del producto'
                        });
                    }
                })
                    .catch(error => {
                    return res.json({
                        status: 'NOK',
                        code: 500,
                        message: 'Ocurrió un error, no fue posible actualizar la información del producto'
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
exports.ProductosController = ProductosController;
