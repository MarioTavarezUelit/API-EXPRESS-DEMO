// Express
import { Router } from 'express';

// Controllers
import { PerfilesController } from '../controllers/perfilesController';

export class PerfilesRoute {

    // Para ingresar los tipo de rutas
    public route:Router;

     // Instancia generada de Perfiles Controller
    private perfilesController = PerfilesController.instancePerfil;

    // Crea instancia de perfiles route
    private static perfilIntance: PerfilesRoute;

    private constructor() {
        this.route = Router();

        this.configRoutes();
    }
    /**
     * Devuelve la instancia de perfiles route
     */
    public static get instancePerfiles(): PerfilesRoute {
        return this.perfilIntance || (this.perfilIntance = new this());
    }

    /**
     * Configura todas las rutas de los perfiles
     */
    public configRoutes() {
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