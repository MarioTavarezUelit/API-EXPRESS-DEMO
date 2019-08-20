"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Express
const express_1 = require("express");
// Controllers
const usuariosController_1 = require("../controllers/usuariosController");
// Middleware
const auth_1 = require("../middlewares/auth");
class UsuariosRoute {
    constructor() {
        // Instancia generada de Usuarios Controller
        this.usuariosController = usuariosController_1.UsuariosController.instanceUsuarios;
        // Instancia generada de Auth Middleware
        this.auth = auth_1.Auth.instanceAuth;
        // Inicializar objeto tipo Router
        this.route = express_1.Router();
        // Configura todas las rutas de los usuarios
        this.configRoutes();
    }
    /**
     * Devuelve la instancia de Usuarios Route si existe, de lo contrario la inicializa
     */
    static get instanceUsuariosRoute() {
        return this.usuariosRouteInstance || (this.usuariosRouteInstance = new this());
    }
    /**
     * Configura todas las rutas de los usuarios
     */
    configRoutes() {
        // Get All Usuarios
        this.route.get('/', this.auth.authenticatedToken, this.usuariosController.getAllUsers);
        // Get Usuario By Id
        this.route.get('/:id', this.auth.authenticatedToken, this.usuariosController.getUserById);
        // Get Usuarios By Criteria
        this.route.get('/search/user/:criterio/:limit', this.auth.authenticatedToken, this.usuariosController.getUsersByCriteria);
        // Get Usuarios By Limit
        this.route.get('/filter/user/:limit', this.auth.authenticatedToken, this.usuariosController.getUsersByLimit);
        // Get Usuario By Email
        this.route.get('/user/:email', this.auth.authenticatedToken, this.usuariosController.getUserByEmail);
        // Post Create Usuario
        this.route.post('/', this.auth.authenticatedToken, this.usuariosController.createUser);
        // Delete Usuario
        this.route.delete('/:id', this.auth.authenticatedToken, this.usuariosController.deleteUser);
        // Put Update Usuario
        this.route.put('/:id', this.auth.authenticatedToken, this.usuariosController.updateUser);
    }
}
exports.UsuariosRoute = UsuariosRoute;
