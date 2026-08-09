import { listaTareas, cantidadTareas, mostrarResumen } from "./crear";
import promptSync from "prompt-sync";
const prompt = promptSync({ sigint: true });

export function buscarfiltro(): void {
    console.clear();
    console.log("\n--- FILTRAR TAREA ---");
    let opc: number;
    do{
    console.log("0. volver\n1. Por Estado\n2. Por Fecha\n3. Por Dificultad");
    opc = parseInt(prompt("Seleccione una opción: "));

    switch (opc) {
      case 0: console.log("¡Hasta luego!"); break;
      case 1: FilEstado(); break;
      //case 2: FilFecha(); break;
      case 2: FilDificultad(); break;
      default: console.log("Opción inválida.");
    } 
    } while(opc !== 0);
} 
    function FilEstado(): void {
        console.clear();
        if (cantidadTareas === 0) {
            console.log("No hay tareas registradas.");
            return;
        }
        const estado = prompt("Ingrese el estado a filtrar: ");
        const tareasFiltradas = listaTareas.filter(tarea => tarea.estado.toLowerCase() === estado.toLowerCase());
        if (tareasFiltradas.length === 0) {
            console.log("No se encontraron tareas con ese estado.");
        } else {
            console.log(`\n--- TAREAS CON ESTADO "${estado}" ---`);
            tareasFiltradas.forEach((tarea, index) => {
                console.log(`${index + 1}. ${tarea.titulo}`);
            });
        }
    }
   /* function FilFecha(): void {
        console.clear();
        if (cantidadTareas === 0) {
            console.log("No hay tareas registradas.");
            return;
        }
        const fecha = prompt("Ingrese la fecha a filtrar (YYYY-MM-DD): ");
        const tareasFiltradas = listaTareas.filter(tarea => tarea.fecha === fecha);
        if (tareasFiltradas.length === 0) {
            console.log("No se encontraron tareas con esa fecha.");
        } else {
            console.log(`\n--- TAREAS CON FECHA "${fecha}" ---`);
            tareasFiltradas.forEach((tarea, index) => {
                console.log(`${index + 1}. ${tarea.titulo}`);
            });
        }
    } */
    function FilDificultad(): void {
        console.clear();
        if (cantidadTareas === 0) {
            console.log("No hay tareas registradas.");
            return;
        }
        const dificultad = prompt("Ingrese la dificultad a filtrar: ");
        const dificultadBuscada = parseInt(dificultad);
        const tareasFiltradas = listaTareas.filter(tarea => tarea.dificultad === dificultadBuscada);
        if (tareasFiltradas.length === 0) {
            console.log("No se encontraron tareas con esa dificultad.");
        } else {
            // Mapa para mostrar el nombre según el número
        const nombres = ["", "Facilísimo", "Fácil", "Medio", "Complicado", "Difícilísimo"];
        console.log(`\n--- TAREAS CON DIFICULTAD: ${nombres[dificultadBuscada]} (${dificultadBuscada}) ---`);
        
        tareasFiltradas.forEach((tarea, index) => {
            console.log(`${index + 1}. ${tarea.titulo}`); 
        });
    }
}
