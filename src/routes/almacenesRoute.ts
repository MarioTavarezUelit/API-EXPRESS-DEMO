// Express
import { Router } from 'express';
// Controllers
import { ProductosController } from '../controllers/productosController';
// Middleware
import { Auth } from '../middlewares/auth';
// Classes
import { AlmacenesController } from '../controllers/almacenesController';

export class AlmacenesRoute {

    // Crea las rutas
    public router: Router;
    // Crea una instancia de la clase AlmacenesRoute
    private static almacenesRouteInstance: AlmacenesRoute;
    // Instancia de la clase almacenesController
    private almacenesController = AlmacenesController.instanceAlmacenesController;
    // Instancia del middleware Auth
    private auth = Auth.instanceAuth;

    private constructor() {
        // Inicializa las rutas
        this.router = Router();
        // Configura las rutas
        this.configRoutes();
    }

    /**
     * Devuelve la instancia de la clase AlmacenesRoute
     */
    public static get instanceAlmacenRoute(): AlmacenesRoute {
        return this.almacenesRouteInstance || (this.almacenesRouteInstance = new this());
    }

    /**
     * Configura las rutas
     */
    private configRoutes(): void {
        // Create Producto
        this.router.post('/', this.auth.authenticatedToken, this.almacenesController.createAlmacen);
        // Delete Producto
        this.router.delete('/:id', this.auth.authenticatedToken, this.almacenesController.deleteAlmacen);
    }

}