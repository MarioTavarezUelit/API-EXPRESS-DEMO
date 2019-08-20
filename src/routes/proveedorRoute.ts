// Router
import { Router } from 'express';
// Controllers
import { ProveedorController } from '../controllers/proveedorController';
// Middlewares
import { Auth } from '../middlewares/auth';

export class ProveedoresRoute {

    // Para utilizar las rutas
    public router: Router;
    // Instancia de la clase ProveedoreController
    private proveedorController = ProveedorController.instanceProveedorController;
    // Instancia del middleware de autenticacion
    private auth = Auth.instanceAuth;
    // Crea instancia de ProveedoresRoute
    private static proveedorsRouteInstance: ProveedoresRoute;


    private constructor() {
        // Inicializa las rutas
        this.router = Router();
        // Configura las rutas
        this.configRoutes();
    }

    /**
     * Devuelve la instancia de la clase ProveedoresRoute
     */
    public static get instanceProveedoresRoute() {
        return this.proveedorsRouteInstance || (this.proveedorsRouteInstance = new this());
    }

    /**
     * Configura las rutas
     */
    private configRoutes(): void {
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