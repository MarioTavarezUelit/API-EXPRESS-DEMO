"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Express
const express_1 = require("express");
// Controllers
const perfilesController_1 = require("../controllers/perfilesController");
class PerfilesRoute {
    constructor() {
        // Instancia generada de Perfiles Controller
        this.perfilesController = perfilesController_1.PerfilesController.instancePerfil;
        this.route = express_1.Router();
        this.configRoutes();
    }
    /**
     * Devuelve la instancia de perfiles route
     */
    static get instancePerfiles() {
        return this.perfilIntance || (this.perfilIntance = new this());
    }
    /**
     * Configura todas las rutas de los perfiles
     */
    configRoutes() {
        // Get All Perfiles
        this.route.get('/', this.perfilesController.getAllPerfiles);
        // Post Crear Perfil
        this.route.post('/', this.perfilesController.createPerfil);
        // Delete Eliminar Perfil
        this.route.delete('/:id', this.perfilesController.deletePerfil);
        // Put Update Perfil
        this.route.put('/:id', this.perfilesController.updatePerfil);
    }
}
exports.PerfilesRoute = PerfilesRoute;
