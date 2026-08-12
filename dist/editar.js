"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editarTarea = editarTarea;
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const crear_1 = require("./crear");
const prompt = (0, prompt_sync_1.default)({ sigint: true });
function editarTarea(service) {
    console.clear();
    const tareas = service.getAll();
    if (tareas.length === 0) {
        console.log("No hay tareas registradas.");
        return;
    }
    console.log("\n--- EDITAR TAREA ---");
    tareas.forEach((tarea, index) => {
        console.log(`${index + 1}. ${tarea.titulo}`);
    });
    const seleccion = parseInt(prompt("Seleccione el número (0 para volver): ")) - 1;
    if (seleccion >= 0 && seleccion < tareas.length) {
        const tarea = tareas[seleccion];
        console.log(`\nEditando: ${tarea.titulo}\n`);
        tarea.titulo = (0, crear_1.solicitarTitulo)();
        tarea.descripcion = (0, crear_1.solicitarDescripcion)();
        tarea.dificultad = (0, crear_1.solicitarDificultad)();
        tarea.estado = (0, crear_1.solicitarEstado)();
        tarea.dueDate = (0, crear_1.solicitarDueDate)();
        service.updateTask(tarea);
        console.log("¡Tarea editada con éxito!");
    }
    else if (seleccion !== -1) {
        console.log("Número inválido.");
    }
    prompt("ENTER para continuar...");
}
