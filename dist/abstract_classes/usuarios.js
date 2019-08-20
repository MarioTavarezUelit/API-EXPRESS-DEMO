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
class Usuarios {
    /**
     * Devuelve todos los usuarios
     * @param req
     * @param res
     */
    getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    /**
     * Devuelve el usuario mediante el id
     * @param req
     * @param res
     */
    getUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    /**
     * Devuelve los usuarios por criterio de busqueda
     * @param req
     * @param res
     */
    getUsersByCriteria(req, res) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    /**
     * Devuelve los usuarios por criterio de busqueda
     * @param req
     * @param res
     */
    getUsersByLimit(req, res) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    /**
     * Devuelve los usuarios por criterio de busqueda
     * @param req
     * @param res
     */
    getUserByEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    /**
     * Crea nuevos usuarios
     * @param req
     * @param res
     */
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    /**
     * Borra un nuevo usuario
     * @param req
     * @param res
     */
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    /**
     * Actualiza un nuevo usuario
     * @param req
     * @param res
     */
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
exports.Usuarios = Usuarios;
