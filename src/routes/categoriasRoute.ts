// Express
import { Router } from 'express';
// Middleware
import { Auth } from '../middlewares/auth';
// Controllers
import { CategoriasController } from '../controllers/categoriasController';

export class CategoriasRoute {

    // Crea instancia de la clase CategoriasRoute
    private static categoriasRouteInstance: CategoriasRoute;

    // Instancia de la clase CategoriasController
    private categoriasController = CategoriasController.instanceCategoriasController;

    // Instancia de la clase auth
    private auth = Auth.instanceAuth;
    
    // Para utilizar las rutas
    public router: Router;

    private constructor() {
        // Inicializa el router
        this.router = Router();
        // Configura las rutas
        this.configRoutes();
    }

    // Devuelve la instancia de la clase CategoriasRoute
    public static get instanceCategoriasInstance() {
        return this.categoriasRouteInstance || (this.categoriasRouteInstance = new this());
    }

    /**
     * Configura todas las rutas
     */
    private configRoutes(): void {
        // CREATE CATEGORIA
        this.router.post('/', this.auth.authenticatedToken, this.categoriasController.createCategoria);
        // DELETE CATEGORIA
        this.router.delete('/:id', this.auth.authenticatedToken, this.categoriasController.deleteCategoria);
        // UPDATE CATEGORIA
        this.router.put('/:id', this.auth.authenticatedToken, this.categoriasController.updateCategoria);
    }

}