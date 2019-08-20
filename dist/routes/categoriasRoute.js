"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Express
const express_1 = require("express");
// Middleware
const auth_1 = require("../middlewares/auth");
// Controllers
const categoriasController_1 = require("../controllers/categoriasController");
class CategoriasRoute {
    constructor() {
        // Instancia de la clase CategoriasController
        this.categoriasController = categoriasController_1.CategoriasController.instanceCategoriasController;
        // Instancia de la clase auth
        this.auth = auth_1.Auth.instanceAuth;
        // Inicializa el router
        this.router = express_1.Router();
        // Configura las rutas
        this.configRoutes();
    }
    // Devuelve la instancia de la clase CategoriasRoute
    static get instanceCategoriasInstance() {
        return this.categoriasRouteInstance || (this.categoriasRouteInstance = new this());
    }
    /**
     * Configura todas las rutas
     */
    configRoutes() {
        // CREATE CATEGORIA
        this.router.post('/', this.auth.authenticatedToken, this.categoriasController.createCategoria);
        // DELETE CATEGORIA
        this.router.delete('/:id', this.auth.authenticatedToken, this.categoriasController.deleteCategoria);
        // UPDATE CATEGORIA
        this.router.put('/:id', this.auth.authenticatedToken, this.categoriasController.updateCategoria);
    }
}
exports.CategoriasRoute = CategoriasRoute;
