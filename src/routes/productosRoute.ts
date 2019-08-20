// Express
import { Router } from 'express';
// Controllers
import { ProductosController } from '../controllers/productosController';
// Middleware
import { Auth } from '../middlewares/auth';
// Classes
import { Productos } from '../abstract_classes/productos';

export class ProductosRoute {

    // Crea las rutas
    public router: Router;
    // Crea una instancia de la clase ProductosRoute
    private static productosRouteInstance: ProductosRoute;
    // Instancia de la clase ProductosController
    private productosController = ProductosController.instanceProductosController;
    // Instancia del middleware Auth
    private auth = Auth.instanceAuth;

    private constructor() {
        // Inicializa las rutas
        this.router = Router();
        // Configura las rutas
        this.configRoutes();
    }

    /**
     * Devuelve la instancia de la clase ProductosRoute
     */
    public static get instanceProductosRoute(): ProductosRoute {
        return this.productosRouteInstance || (this.productosRouteInstance = new this());
    }

    /**
     * Configura las rutas
     */
    private configRoutes(): void {
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