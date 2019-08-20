"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Express
const express_1 = require("express");
// Controllers
const productosController_1 = require("../controllers/productosController");
// Middleware
const auth_1 = require("../middlewares/auth");
class ProductosRoute {
    constructor() {
        // Instancia de la clase ProductosController
        this.productosController = productosController_1.ProductosController.instanceProductosController;
        // Instancia del middleware Auth
        this.auth = auth_1.Auth.instanceAuth;
        // Inicializa las rutas
        this.router = express_1.Router();
        // Configura las rutas
        this.configRoutes();
    }
    /**
     * Devuelve la instancia de la clase ProductosRoute
     */
    static get instanceProductosRoute() {
        return this.productosRouteInstance || (this.productosRouteInstance = new this());
    }
    /**
     * Configura las rutas
     */
    configRoutes() {
        // Get Producto By Id
        this.router.get('/:id', this.auth.authenticatedToken, this.productosController.getProductoById);
        // Get Productos By limit
        this.router.get('/search/producto/:limit', this.auth.authenticatedToken, this.productosController.getProductosByLimit);
        // Get Productos By Categoria
        this.router.get('/busqueda-categoria/:categoria', this.auth.authenticatedToken, this.productosController.getProductosByCategoria);
        // Create Producto
        this.router.post('/', this.auth.authenticatedToken, this.productosController.createProducto);
        // Delete Producto
        this.router.delete('/:id', this.auth.authenticatedToken, this.productosController.deleteProducto);
        // Update Producto
        this.router.put('/:id', this.auth.authenticatedToken, this.productosController.updateProducto);
    }
}
exports.ProductosRoute = ProductosRoute;
