"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editarTarea = editarTarea;
const crear_1 = require("./crear");
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const prompt = (0, prompt_sync_1.default)({ sigint: true });
function editarTarea() {
    console.clear();
    if (crear_1.cantidadTareas === 0) {
        console.log("No hay tareas registradas.");
        return;
    }
    console.log("\n--- EDITAR TAREA ---");
    for (let i = 0; i < crear_1.cantidadTareas; i++) {
        console.log(`${i + 1}. ${crear_1.listaTareas[i].titulo}`);
    }
    const seleccion = parseInt(prompt("Seleccione el número (0 para volver): ")) - 1;
    if (seleccion >= 0 && seleccion < crear_1.cantidadTareas) {
        let tarea = crear_1.listaTareas[seleccion];
        console.log(`\nEditando: ${tarea.titulo}\n`);
        (0, crear_1.pedirTitulo)(tarea);
        (0, crear_1.pedirDescripcion)(tarea);
        (0, crear_1.pedirDificultad)(tarea);
        (0, crear_1.pedirEstado)(tarea);
        (0, crear_1.pedirFechaVencimiento)(tarea);
        console.log("¡Tarea editada con éxito!");
    }
    else if (seleccion !== -1) {
        console.log("Número inválido.");
    }
    prompt("ENTER para continuar...");
}
