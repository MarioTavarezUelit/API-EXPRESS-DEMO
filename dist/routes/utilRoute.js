"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Express
const express_1 = require("express");
// Controllers
const utilController_1 = require("../controllers/utilController");
// Middlewares
const auth_1 = require("../middlewares/auth");
class UtilRoute {
    constructor() {
        // Instancia de UtilController
        this.utilController = utilController_1.UtilController.instanceUtilController;
        // Instancia del middleware auth
        this.auth = auth_1.Auth.instanceAuth;
        // Inicializa el objeto router
        this.route = express_1.Router();
        // Configura las rutas
        this.configRoutes();
    }
    /**
     * Devuelve la instancia de la clase UtilRoute
     */
    static get instanceUtilRoute() {
        return this.utilRouteInstance || (this.utilRouteInstance = new this());
    }
    /**
     * Configura todas las rutas de la utileria
     */
    configRoutes() {
        this.route.get('/:table', this.auth.authenticatedToken, this.utilController.getAllDataByTable);
    }
}
exports.UtilRoute = UtilRoute;
