"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buscarTarea = buscarTarea;
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const crear_1 = require("./crear");
const prompt = (0, prompt_sync_1.default)({ sigint: true });
function buscarTarea(service) {
    console.clear();
    const tareas = service.getAll();
    if (tareas.length === 0) {
        console.log("No hay tareas registradas.");
        return;
    }
    console.log("\n--- BUSCAR TAREA ---");
    tareas.forEach((tarea, index) => {
        console.log(`${index + 1}. ${tarea.titulo}`);
    });
    const seleccion = parseInt(prompt("Seleccione el ID de tarea (0 para volver): "));
    if (seleccion > 0 && seleccion <= tareas.length) {
        console.clear();
        (0, crear_1.mostrarResumen)(tareas[seleccion - 1]);
    }
    else if (seleccion !== 0) {
        console.log("Número inválido.");
    }
    prompt("ENTER para continuar...");
}
