"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminar = eliminar;
// Asegúrate de importar 'guardarEnArchivo' y asignar de nuevo la lista
const crear_1 = require("./crear");
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const prompt = (0, prompt_sync_1.default)({ sigint: true });
function eliminar() {
    console.clear();
    if (crear_1.listaTareas.length === 0) {
        console.log("No hay tareas para eliminar.");
        prompt("Presione ENTER para volver...");
        return;
    }
    console.log("\n--- ELIMINAR TAREA ---");
    // Mostramos la lista con índices para que el usuario elija
    crear_1.listaTareas.forEach((t, i) => {
        console.log(`${i + 1}. [${t.ID}] ${t.titulo}`);
    });
    const seleccion = parseInt(prompt("\nSeleccione el número de tarea a eliminar (0 para cancelar): "));
    if (seleccion > 0 && seleccion <= crear_1.listaTareas.length) {
        const indice = seleccion - 1;
        console.clear();
        console.log("Vas a eliminar la siguiente tarea:");
        (0, crear_1.mostrarResumen)(crear_1.listaTareas[indice]);
        const confirmacion = prompt("¿Estás seguro? (SI/NO): ").toUpperCase();
        if (confirmacion === "SI") {
            // ELIMINACIÓN REAL: Borra 1 elemento en la posición 'indice'
            crear_1.listaTareas.splice(indice, 1);
            // ACTUALIZACIÓN DE PERSISTENCIA
            (0, crear_1.guardarEnArchivo)();
            console.log("\n¡Tarea eliminada con éxito!");
        }
        else {
            console.log("\nOperación cancelada.");
        }
    }
    else if (seleccion !== 0) {
        console.log("Selección inválida.");
    }
    prompt("\nPresione ENTER para continuar...");
}
