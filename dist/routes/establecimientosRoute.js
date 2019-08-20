"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Express
const express_1 = require("express");
// Controller
const establecimientosController_1 = require("../controllers/establecimientosController");
// Middleware
const auth_1 = require("../middlewares/auth");
class EstablecimientosRoute {
    constructor() {
        // Instancia de EstablecimientosController
        this.establecimientosController = establecimientosController_1.EstablecimientosController.instanceEstablecimientosController;
        // Instancia de Auth Middleware
        this.auth = auth_1.Auth.instanceAuth;
        // Inicializa las rutas
        this.router = express_1.Router();
        // Configura las rutas
        this.configRoutes();
    }
    // Devuelve instancia de la clase EstablecimientosRoute
    static get instanceEstablecimientosRoute() {
        return this.establecimientosRouteInstance || (this.establecimientosRouteInstance = new this());
    }
    /**
     * Configura las rutas
     */
    configRoutes() {
        // Create Establecimiento
        this.router.post('/', this.auth.authenticatedToken, this.establecimientosController.createEstablecimiento);
        // Delete Establecimiento
        this.router.delete('/:id', this.auth.authenticatedToken, this.establecimientosController.deleteEstablecimiento);
        // Update Establecimiento
        this.router.put('/:id', this.auth.authenticatedToken, this.establecimientosController.updateEstablecimiento);
    }
}
exports.EstablecimientosRoute = EstablecimientosRoute;
