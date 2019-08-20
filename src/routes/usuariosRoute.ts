// Express
import { Router } from 'express';

// Controllers
import { UsuariosController } from '../controllers/usuariosController';

// Middleware
import { Auth } from '../middlewares/auth';

export class UsuariosRoute {

    // Para ingresar los tipo de rutas
    public route: Router;

    // Instancia generada de Usuarios Controller
    private usuariosController = UsuariosController.instanceUsuarios;

    // Crear instancia de Usuarios Route
    private static usuariosRouteInstance: UsuariosRoute;

    // Instancia generada de Auth Middleware
    private auth = Auth.instanceAuth;


    private constructor() {
        // Inicializar objeto tipo Router
        this.route = Router();
        // Configura todas las rutas de los usuarios
        this.configRoutes();
    }

    /**
     * Devuelve la instancia de Usuarios Route si existe, de lo contrario la inicializa
     */
    public static get instanceUsuariosRoute(): UsuariosRoute {
        return this.usuariosRouteInstance || (this.usuariosRouteInstance = new this());
    }

    /**
     * Configura todas las rutas de los usuarios
     */
    public configRoutes(): void {
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