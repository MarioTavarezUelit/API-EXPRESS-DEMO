"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Router
const express_1 = require("express");
// Controllers
const proveedorController_1 = require("../controllers/proveedorController");
// Middlewares
const auth_1 = require("../middlewares/auth");
class ProveedoresRoute {
    constructor() {
        // Instancia de la clase ProveedoreController
        this.proveedorController = proveedorController_1.ProveedorController.instanceProveedorController;
        // Instancia del middleware de autenticacion
        this.auth = auth_1.Auth.instanceAuth;
        // Inicializa las rutas
        this.router = express_1.Router();
        // Configura las rutas
        this.configRoutes();
    }
    /**
     * Devuelve la instancia de la clase ProveedoresRoute
     */
    static get instanceProveedoresRoute() {
        return this.proveedorsRouteInstance || (this.proveedorsRouteInstance = new this());
    }
    /**
     * Configura las rutas
     */
    configRoutes() {
        // Get Proveedors By Limit
        this.router.get('/search/proveedor/:limit', this.auth.authenticatedToken, this.proveedorController.getProveedoresByLimit);
        // Create Proveedor
        this.router.post('/', this.auth.authenticatedToken, this.proveedorController.createProveedor);
        // Delete Proveedor
        this.router.delete('/:id', this.auth.authenticatedToken, this.proveedorController.deleteProveedor);
        // Update Proveedor
        this.router.put('/:id', this.auth.authenticatedToken, this.proveedorController.updateProveedor);
    }
}
exports.ProveedoresRoute = ProveedoresRoute;
