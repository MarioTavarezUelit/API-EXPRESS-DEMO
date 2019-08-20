"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Server
const server_1 = require("./classes/server");
class ServerApi {
    constructor() {
        this.server = server_1.Server.instanceServer;
        // Configurar Servidor
        this.server.configServer();
        // Configurar Rutas
        this.server.configRoutesServer();
        // Correr Servidor
        this.server.runServer();
    }
}
const serverApi = new ServerApi();
