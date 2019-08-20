"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Express
const express_1 = require("express");
// Middleware
const auth_1 = require("../middlewares/auth");
// Classes
const almacenesController_1 = require("../controllers/almacenesController");
class AlmacenesRoute {
    constructor() {
        // Instancia de la clase almacenesController
        this.almacenesController = almacenesController_1.AlmacenesController.instanceAlmacenesController;
        // Instancia del middleware Auth
        this.auth = auth_1.Auth.instanceAuth;
        // Inicializa las rutas
        this.router = express_1.Router();
        // Configura las rutas
        this.configRoutes();
    }
    /**
     * Devuelve la instancia de la clase AlmacenesRoute
     */
    static get instanceAlmacenRoute() {
        return this.almacenesRouteInstance || (this.almacenesRouteInstance = new this());
    }
    /**
     * Configura las rutas
     */
    configRoutes() {
        // Create Producto
        this.router.post('/', this.auth.authenticatedToken, this.almacenesController.createAlmacen);
        // Delete Producto
        this.router.delete('/:id', this.auth.authenticatedToken, this.almacenesController.deleteAlmacen);
    }
}
exports.AlmacenesRoute = AlmacenesRoute;
