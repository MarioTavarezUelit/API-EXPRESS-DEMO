"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Express
const express_1 = __importDefault(require("express"));
// HTTP
const http_1 = __importDefault(require("http"));
// Socket.IO
const socket_io_1 = __importDefault(require("socket.io"));
// Cors
const cors_1 = __importDefault(require("cors"));
// Helmet
const helmet_1 = __importDefault(require("helmet"));
// Morgan
const morgan_1 = __importDefault(require("morgan"));
// Constants
const constants_1 = __importDefault(require("../config/constants"));
// Sockets
const sockets_1 = require("../sockets/sockets");
// Routes
const usuariosRoute_1 = require("../routes/usuariosRoute");
const perfilesRoute_1 = require("../routes/perfilesRoute");
const categoriasRoute_1 = require("../routes/categoriasRoute");
const establecimientosRoute_1 = require("../routes/establecimientosRoute");
const proveedorRoute_1 = require("../routes/proveedorRoute");
const productosRoute_1 = require("../routes/productosRoute");
const authRoute_1 = require("../routes/authRoute");
const utilRoute_1 = require("../routes/utilRoute");
const almacenesRoute_1 = require("../routes/almacenesRoute");
// Logger
const log4js_1 = __importDefault(require("log4js"));
class Server {
    constructor() {
        // Usuario Route Instance
        this.usuariosRoute = usuariosRoute_1.UsuariosRoute.instanceUsuariosRoute;
        // Perfiles Route Instance
        this.perfilesRoute = perfilesRoute_1.PerfilesRoute.instancePerfiles;
        // Categorias Route Instance
        this.categoriasRoute = categoriasRoute_1.CategoriasRoute.instanceCategoriasInstance;
        // Establecimientos Route Instance
        this.establecimientosRoute = establecimientosRoute_1.EstablecimientosRoute.instanceEstablecimientosRoute;
        // Proveedores Route Instance
        this.proveedoresRoute = proveedorRoute_1.ProveedoresRoute.instanceProveedoresRoute;
        // Productos Route Instance
        this.productosRoute = productosRoute_1.ProductosRoute.instanceProductosRoute;
        // Almacenes Route Instance
        this.almacenesRoute = almacenesRoute_1.AlmacenesRoute.instanceAlmacenRoute;
        // Authentication Route Instance
        this.authRoute = authRoute_1.AuthRoute.instanceAuthRoute;
        // Sockets Instance
        this.sockets = sockets_1.Sockets.instanceSocket;
        // Util Instance
        this.utilRoute = utilRoute_1.UtilRoute.instanceUtilRoute;
        // Configurar Logger
        this.configLogger();
        // Inicializar aplicacion
        this.app = express_1.default();
        // Inicializar servidor http
        this.httpServer = new http_1.default.Server(this.app);
        // Inicializar servidor de sockets
        this.io = socket_io_1.default(this.httpServer);
    }
    /**
     * Devuelve una nueva instancia si no se ha generado
     * De lo contrario devuelve la instancia ya generada
     */
    static get instanceServer() {
        return this.serverInstance || (this.serverInstance = new this());
    }
    /**
     * Realiza las configuraciones que utilizara el servidor
     */
    configServer() {
        // Setea el puerto de arranque ya sea de produccion o desarrollo
        this.app.set('port', process.env.PORT || constants_1.default.PORT);
        // Restringir el origen de datos, valida que la fuente donde se consumen los datos este validada
        this.app.use(cors_1.default());
        // Para proteger la aplicacion de vulverabilidades mediante cabeceras HTTP
        this.app.use(helmet_1.default());
        // Muestra las peticiones en consola que se realizan en el servidor
        this.app.use(morgan_1.default('dev'));
        // Acepta formato json del lado del cliente
        this.app.use(express_1.default.json());
        // Acepta informacion que es enviada a traves de formularios HTML
        this.app.use(express_1.default.urlencoded({ extended: true }));
    }
    /**
     * Se configuran todas las rutas del servidor
     */
    configRoutesServer() {
        // Usuarios
        this.app.use(`/${constants_1.default.OPENBIS}/users`, this.usuariosRoute.route);
        // Autenticacion
        this.app.use(`/${constants_1.default.OPENBIS}/authentication`, this.authRoute.route);
        // Perfiles
        this.app.use(`/${constants_1.default.OPENBIS}/perfiles`, this.perfilesRoute.route);
        // Categorias
        this.app.use(`/${constants_1.default.OPENBIS}/categorias`, this.categoriasRoute.router);
        // Establecimientos
        this.app.use(`/${constants_1.default.OPENBIS}/establecimientos`, this.establecimientosRoute.router);
        // Proveedores
        this.app.use(`/${constants_1.default.OPENBIS}/proveedores`, this.proveedoresRoute.router);
        // Almacenes
        this.app.use(`/${constants_1.default.OPENBIS}/almacenes`, this.almacenesRoute.router);
        // Productos
        this.app.use(`/${constants_1.default.OPENBIS}/productos`, this.productosRoute.router);
        // Utilerias
        this.app.use(`/${constants_1.default.OPENBIS}/util`, this.utilRoute.route);
    }
    /**
     * Se configura el log de salida
     */
    configLogger() {
        log4js_1.default.configure({
            appenders: { openbis: { type: 'file', filename: 'logs/openbis.log' } },
            categories: { default: { appenders: ['openbis'], level: 'info' } }
        });
        this.logger = log4js_1.default.getLogger('openbis');
    }
    /**
     * Mediante el metodo connection se realiza la conexion con el cliente
     */
    runSockets() {
        this.io.on('connection', cliente => {
            console.log(`Usuario conectado ${cliente.id}`);
            // Detecta la desconexion del cliente
            this.sockets.desconectar(cliente);
        });
    }
    /**
     * Corre el servidor en el puerto configurado
     */
    runServer() {
        this.httpServer.listen(this.app.get('port'), () => {
            console.log(`Server on port ${this.app.get('port')}`);
            this.logger.info(`Server on port ${this.app.get('port')}`);
        });
    }
}
exports.Server = Server;
