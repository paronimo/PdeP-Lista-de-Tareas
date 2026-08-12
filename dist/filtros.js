"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buscarfiltro = buscarfiltro;
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const crear_1 = require("./crear");
const prompt = (0, prompt_sync_1.default)({ sigint: true });
function buscarfiltro(service) {
    console.clear();
    console.log("\n--- FILTRAR TAREA ---");
    let opc;
    do {
        console.log("0. volver\n1. Por Estado\n2. Por Dificultad");
        opc = parseInt(prompt("Seleccione una opción: "));
        switch (opc) {
            case 0:
                break;
            case 1:
                FilEstado(service);
                break;
            case 2:
                FilDificultad(service);
                break;
            default:
                console.log("Opción inválida.");
        }
    } while (opc !== 0);
}
function FilEstado(service) {
    console.clear();
    const estado = prompt("Ingrese el estado a filtrar: ").trim();
    const estadoNormalizado = normalizarEstado(estado);
    if (!estadoNormalizado) {
        console.log("Estado inválido.");
        return;
    }
    const tareasFiltradas = service.filterByStatus(estadoNormalizado);
    if (tareasFiltradas.length === 0) {
        console.log("No se encontraron tareas con ese estado.");
        return;
    }
    console.log(`\n--- TAREAS CON ESTADO "${estadoNormalizado}" ---`);
    tareasFiltradas.forEach((tarea, index) => {
        console.log(`${index + 1}. ${tarea.titulo}`);
        (0, crear_1.mostrarResumen)(tarea);
    });
}
function FilDificultad(service) {
    console.clear();
    const dificultad = parseInt(prompt("Ingrese la dificultad a filtrar: "));
    if (Number.isNaN(dificultad) || dificultad < 1 || dificultad > 5) {
        console.log("Dificultad inválida.");
        return;
    }
    const tareasFiltradas = service.filterByDifficulty(dificultad);
    if (tareasFiltradas.length === 0) {
        console.log("No se encontraron tareas con esa dificultad.");
        return;
    }
    const nombres = ["", "Facilísimo", "Fácil", "Medio", "Complicado", "Difícilísimo"];
    console.log(`\n--- TAREAS CON DIFICULTAD: ${nombres[dificultad]} (${dificultad}) ---`);
    tareasFiltradas.forEach((tarea, index) => {
        console.log(`${index + 1}. ${tarea.titulo}`);
        (0, crear_1.mostrarResumen)(tarea);
    });
}
function normalizarEstado(estado) {
    const estadoLower = estado.toLowerCase();
    if (estadoLower === "pendiente")
        return "Pendiente";
    if (estadoLower === "en curso" || estadoLower === "encurso")
        return "En curso";
    if (estadoLower === "terminada" || estadoLower === "terminado")
        return "Terminada";
    return null;
}
