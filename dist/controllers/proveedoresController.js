"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ProveedoresController {
    constructor() { }
    static get instanceProveedoresController() {
        return this.proveedoresControllerInstance || (this.proveedoresControllerInstance = new this());
    }
}
exports.ProveedoresController = ProveedoresController;
