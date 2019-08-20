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
class Proveedores {
    /**
     * Devuelve a los proveedores por criterio de busqueda y limite
     * @param req
     * @param res
     */
    getProveedoresByLimit(req, res) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    /**
     * Crea un nuevo proveedor
     * @param req
     * @param res
     */
    createProveedor(req, res) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    /**
     * Elimina a un proveedor
     * @param req
     * @param res
     */
    deleteProveedor(req, res) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    /**
     * Actualiza a un proveedor
     * @param req
     * @param res
     */
    updateProveedor(req, res) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
exports.Proveedores = Proveedores;
