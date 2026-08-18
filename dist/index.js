"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const TareaRepository_1 = require("./repositories/TareaRepository");
const TareaService_1 = require("./services/TareaService");
const crear_1 = require("./crear");
const filtros_1 = require("./filtros");
const buscar_1 = require("./buscar");
const editar_1 = require("./editar");
const eliminarS_1 = require("./eliminarS");
const prompt = (0, prompt_sync_1.default)({ sigint: true });
function main() {
    const repository = new TareaRepository_1.JsonTareaRepository();
    const service = new TareaService_1.TareaService(repository);
    let opc;
    do {
        console.log("\n--- MENÚ PRINCIPAL ---");
        console.log("0. Salir\n1. Crear tarea\n2. Filtrar tareas\n3. Buscar tarea\n4. Editar tarea\n5. Eliminar la tarea");
        opc = parseInt(prompt("Seleccione una opción: "));
        switch (opc) {
            case 0:
                console.log("¡Hasta luego!");
                break;
            case 1:
                (0, crear_1.crearTarea)(service);
                break;
            case 2:
                (0, filtros_1.buscarfiltro)(service);
                break;
            case 3:
                (0, buscar_1.buscarTarea)(service);
                break;
            case 4:
                (0, editar_1.editarTarea)(service);
                break;
            case 5:
                (0, eliminarS_1.eliminar)(service);
                break;
            default:
                console.log("Opción inválida.");
        }
    } while (opc !== 0);
}
main();
