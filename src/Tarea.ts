
/*1)Instalar prompt-sync → npm install prompt-sync
  2)Compilar: tsc tareas.ts
  3)Ejecutar: node tareas.js
  SOLO iniciar con npm start para compilar y ejecutar en un solo paso.
   */

import promptSync from "prompt-sync";
const prompt = promptSync({ sigint: true });

import { crearTarea, listaTareas, cantidadTareas, mostrarResumen } from "./crear";
import { buscarfiltro } from "./filtros";
import { buscarTarea } from "./buscar";
import { editarTarea } from "./editar";
import { eliminar} from "./eliminarS";
function main(): void {
  let opc: number;

  do {
    console.log("\n--- MENÚ PRINCIPAL ---");
    console.log("0. Salir\n1. Crear tarea\n2. Filtrar tareas\n3. Buscar tarea\n4. Editar tarea\n5. Eliminar la tarea");
    opc = parseInt(prompt("Seleccione una opción: "));

    switch (opc) {
      case 0: console.log("¡Hasta luego!"); break;
      case 1: crearTarea(); break;
    //  case 2: buscarfiltro(); break; 
      case 3: buscarTarea(); break;
      case 4: editarTarea(); break;
      case 5: eliminar(); break;
      default: console.log("Opción inválida.");
    }
  } while (opc !== 0);
}

main();
