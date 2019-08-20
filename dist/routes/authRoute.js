"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Express
const express_1 = require("express");
// Controllers
const authController_1 = require("../controllers/authController");
class AuthRoute {
    constructor() {
        // Instancia de la clase AuthController
        this.authController = authController_1.AuthController.instanceAuthController;
        // Inicializar objeto tipo Router
        this.route = express_1.Router();
        // Configura las rutas de autenticacion
        this.configRoute();
    }
    /**
     * Devuelv ela instancia de la clase AuthRoute
     */
    static get instanceAuthRoute() {
        return this.authRouteInstance || (this.authRouteInstance = new this());
    }
    /**
     * Configura las rutas de autenticacion
     */
    configRoute() {
        // Post Auth Usuarios
        this.route.post('/auth', this.authController.auth);
        // Post Reset Password
        this.route.post('/reset', this.authController.resetPassword);
        // Post change Password
        this.route.post('/change-password', this.authController.changePassword);
    }
}
exports.AuthRoute = AuthRoute;
