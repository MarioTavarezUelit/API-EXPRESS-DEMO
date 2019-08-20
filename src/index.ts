// Server
import { Server } from './classes/server';
import { UsuariosController } from './controllers/usuariosController';


class ServerApi {

    private server = Server.instanceServer;

    constructor() {

        // Configurar Servidor
        this.server.configServer();
        // Configurar Rutas
        this.server.configRoutesServer();
        // Correr Servidor
        this.server.runServer();
    }

}

const serverApi = new ServerApi();