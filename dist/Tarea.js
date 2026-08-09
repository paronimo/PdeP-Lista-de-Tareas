"use strict";
/*1)Instalar prompt-sync → npm install prompt-sync
  2)Compilar: tsc tareas.ts
  3)Ejecutar: node tareas.js
  SOLO iniciar con npm start para compilar y ejecutar en un solo paso.
   */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const prompt = (0, prompt_sync_1.default)({ sigint: true });
const crear_1 = require("./crear");
const Ver_1 = require("./Ver");
const buscar_1 = require("./buscar");
const editar_1 = require("./editar");
const eliminarS_1 = require("./eliminarS");
function main() {
    let opc;
    do {
        console.log("\n--- MENÚ PRINCIPAL ---");
        console.log("0. Salir\n1. Crear tarea\n2. Ver tareas\n3. Buscar tarea\n4. Editar tarea\n5. Eliminar la tarea");
        opc = parseInt(prompt("Seleccione una opción: "));
        switch (opc) {
            case 0:
                console.log("¡Hasta luego!");
                break;
            case 1:
                (0, crear_1.crearTarea)();
                break;
            case 2:
                (0, Ver_1.verTareas)();
                break;
            case 3:
                (0, buscar_1.buscarTarea)();
                break;
            case 4:
                (0, editar_1.editarTarea)();
                break;
            case 5:
                (0, eliminarS_1.eliminar)();
                break;
            default: console.log("Opción inválida.");
        }
    } while (opc !== 0);
}
main();
