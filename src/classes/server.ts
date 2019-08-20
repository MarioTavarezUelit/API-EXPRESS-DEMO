// Express
import express from 'express';
// HTTP
import http from 'http';
// Socket.IO
import socketIO from 'socket.io';
// Cors
import cors from 'cors';
// Helmet
import helmet from 'helmet';
// Morgan
import morgan from 'morgan';
// Constants
import Constants from '../config/constants';
// Sockets
import { Sockets } from '../sockets/sockets';
// Routes
import { UsuariosRoute } from '../routes/usuariosRoute';
import { PerfilesRoute } from '../routes/perfilesRoute';
import { CategoriasRoute } from '../routes/categoriasRoute';
import { EstablecimientosRoute } from '../routes/establecimientosRoute';
import { ProveedoresRoute } from '../routes/proveedorRoute';
import { ProductosRoute } from '../routes/productosRoute';
import { AuthRoute } from '../routes/authRoute';
import { UtilRoute } from '../routes/utilRoute';
import { AlmacenesRoute } from '../routes/almacenesRoute';
// Logger
import log4js from 'log4js';

export class Server {

    // Application Express
    public app: express.Application
    // Socket.IO
    public io: socketIO.Server;
    // Http Server
    public httpServer: http.Server;
    // Se protege la instancia y se crea variable statica para patron Singleton
    private static serverInstance: Server;
    // Usuario Route Instance
    private usuariosRoute = UsuariosRoute.instanceUsuariosRoute;
    // Perfiles Route Instance
    private perfilesRoute = PerfilesRoute.instancePerfiles;
    // Categorias Route Instance
    private categoriasRoute = CategoriasRoute.instanceCategoriasInstance;
    // Establecimientos Route Instance
    private establecimientosRoute = EstablecimientosRoute.instanceEstablecimientosRoute;
    // Proveedores Route Instance
    private proveedoresRoute = ProveedoresRoute.instanceProveedoresRoute;
    // Productos Route Instance
    private productosRoute = ProductosRoute.instanceProductosRoute;
    // Almacenes Route Instance
    private almacenesRoute = AlmacenesRoute.instanceAlmacenRoute;
    // Authentication Route Instance
    private authRoute = AuthRoute.instanceAuthRoute;
    // Sockets Instance
    private sockets = Sockets.instanceSocket;
    // Util Instance
    private utilRoute = UtilRoute.instanceUtilRoute;
    // Logger
    public logger: any;

    private constructor() {
        // Configurar Logger
        this.configLogger();
        // Inicializar aplicacion
        this.app = express();
        // Inicializar servidor http
        this.httpServer = new http.Server(this.app);
        // Inicializar servidor de sockets
        this.io = socketIO(this.httpServer);
    }

    /**
     * Devuelve una nueva instancia si no se ha generado
     * De lo contrario devuelve la instancia ya generada
     */
    public static get instanceServer(): Server {
        return this.serverInstance || (this.serverInstance = new this());
    }

    /**
     * Realiza las configuraciones que utilizara el servidor
     */
    public configServer(): void {
        // Setea el puerto de arranque ya sea de produccion o desarrollo
        this.app.set('port', process.env.PORT || Constants.PORT);
        // Restringir el origen de datos, valida que la fuente donde se consumen los datos este validada
        this.app.use(cors());
        // Para proteger la aplicacion de vulverabilidades mediante cabeceras HTTP
        this.app.use(helmet());
        // Muestra las peticiones en consola que se realizan en el servidor
        this.app.use(morgan('dev'));
        // Acepta formato json del lado del cliente
        this.app.use(express.json());
        // Acepta informacion que es enviada a traves de formularios HTML
        this.app.use(express.urlencoded({ extended: true }));
    }

    /**
     * Se configuran todas las rutas del servidor
     */
    public configRoutesServer(): void {
        // Usuarios
        this.app.use(`/${Constants.OPENBIS}/users`, this.usuariosRoute.route);
        // Autenticacion
        this.app.use(`/${Constants.OPENBIS}/authentication`, this.authRoute.route);
        // Perfiles
        this.app.use(`/${Constants.OPENBIS}/perfiles`, this.perfilesRoute.route);
        // Categorias
        this.app.use(`/${Constants.OPENBIS}/categorias`, this.categoriasRoute.router);
        // Establecimientos
        this.app.use(`/${Constants.OPENBIS}/establecimientos`, this.establecimientosRoute.router);
        // Proveedores
        this.app.use(`/${Constants.OPENBIS}/proveedores`, this.proveedoresRoute.router);
        // Almacenes
        this.app.use(`/${Constants.OPENBIS}/almacenes`, this.almacenesRoute.router);
        // Productos
        this.app.use(`/${Constants.OPENBIS}/productos`, this.productosRoute.router);
        // Utilerias
        this.app.use(`/${Constants.OPENBIS}/util`, this.utilRoute.route);
    }

    /**
     * Se configura el log de salida
     */
    private configLogger() {
        log4js.configure({
            appenders: { openbis: { type: 'file', filename: 'logs/openbis.log' } },
            categories: { default: { appenders: ['openbis'], level: 'info' } }
          });

        this.logger = log4js.getLogger('openbis');
    }

    /**
     * Mediante el metodo connection se realiza la conexion con el cliente
     */
    public runSockets(): void {
        this.io.on('connection', cliente => {
            console.log(`Usuario conectado ${cliente.id}`);
            // Detecta la desconexion del cliente
            this.sockets.desconectar(cliente);
        });
    }

    /**
     * Corre el servidor en el puerto configurado
     */
    public runServer(): void {
        this.httpServer.listen(this.app.get('port'), () => {
            console.log(`Server on port ${this.app.get('port')}`);
            this.logger.info(`Server on port ${this.app.get('port')}`);
        });
    }
    
}