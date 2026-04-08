"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buscarTarea = buscarTarea;
const crear_1 = require("./crear");
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const prompt = (0, prompt_sync_1.default)({ sigint: true });
function buscarTarea() {
    console.clear();
    if (crear_1.cantidadTareas === 0) {
        console.log("No hay tareas registradas.");
        return;
    }
    console.log("\n--- BUSCAR TAREA ---");
    for (let i = 0; i < crear_1.cantidadTareas; i++) {
        console.log(`${i + 1}. ${crear_1.listaTareas[i].titulo}`);
    }
    const seleccion = parseInt(prompt("Seleccione el ID de tarea (0 para volver): "));
    if (seleccion > 0 && seleccion <= crear_1.cantidadTareas) {
        console.clear();
        (0, crear_1.mostrarResumen)(crear_1.listaTareas[seleccion - 1]);
    }
    else if (seleccion !== 0) {
        console.log("Número inválido.");
    }
    prompt("ENTER para continuar...");
}
