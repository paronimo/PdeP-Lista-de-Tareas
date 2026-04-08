"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verTareas = verTareas;
exports.mostrarPorEstado = mostrarPorEstado;
const crear_1 = require("./crear");
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const prompt = (0, prompt_sync_1.default)({ sigint: true });
function verTareas() {
    console.clear();
    if (crear_1.cantidadTareas === 0) {
        console.log("No hay tareas registradas.");
        return;
    }
    let opcion;
    do {
        console.log("\n--- VER TAREAS ---");
        console.log("(0) Volver\n(1) Todas\n(2) Pendientes\n(3) En curso\n(4) Terminadas");
        opcion = parseInt(prompt("Seleccione una opción: "));
        switch (opcion) {
            case 0: return;
            case 1:
                mostrarPorEstado("Todas");
                break;
            case 2:
                mostrarPorEstado("Pendiente");
                break;
            case 3:
                mostrarPorEstado("En curso");
                break;
            case 4:
                mostrarPorEstado("Terminada");
                break;
            default: console.log("Opción inválida.");
        }
    } while (opcion !== 0);
}
function mostrarPorEstado(estado) {
    console.clear();
    console.log(`\n--- ${estado === "Todas" ? "Todas las tareas" : "Tareas " + estado} ---\n`);
    let encontradas = false;
    for (let i = 0; i < crear_1.cantidadTareas; i++) {
        if (estado === "Todas" || crear_1.listaTareas[i].estado === estado) {
            (0, crear_1.mostrarResumen)(crear_1.listaTareas[i]);
            encontradas = true;
        }
    }
    if (!encontradas)
        console.log("No hay tareas en esta categoría.");
    prompt("ENTER para continuar...");
}
