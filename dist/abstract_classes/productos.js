"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class Productos {
    /**
     * Devuelve el producto por id
     * @param req
     * @param res
     */
    getProductoById(req, res) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    /**
     * Devuelve los productos por limite
     * @param req
     * @param res
     */
    getProductosByLimit(req, res) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    /**
     * Devuelve los productos por categoria
     * @param req
     * @param res
     */
    getProductosByCategoria(req, res) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    /**
     * Crea un nuevo producto
     * @param req
     * @param res
     */
    createProducto(req, res) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    /**
     * Elimina un producto
     * @param req
     * @param res
     */
    deleteProducto(req, res) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    /**
     * Actualiza un producto
     * @param req
     * @param res
     */
    updateProducto(req, res) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
exports.Productos = Productos;
