// Asegúrate de importar 'guardarEnArchivo' y asignar de nuevo la lista
import { listaTareas, mostrarResumen, guardarEnArchivo } from "./crear";
import promptSync from "prompt-sync";

const prompt = promptSync({ sigint: true });

export function eliminar(): void {
    console.clear();

    if (listaTareas.length === 0) {
        console.log("No hay tareas para eliminar.");
        prompt("Presione ENTER para volver...");
        return;
    }

    console.log("\n--- ELIMINAR TAREA ---");
    // Mostramos la lista con índices para que el usuario elija
    listaTareas.forEach((t, i) => {
        console.log(`${i + 1}. [${t.ID}] ${t.titulo}`);
    });

    const seleccion = parseInt(prompt("\nSeleccione el número de tarea a eliminar (0 para cancelar): "));

    if (seleccion > 0 && seleccion <= listaTareas.length) {
        const indice = seleccion - 1;
        
        console.clear();
        console.log("Vas a eliminar la siguiente tarea:");
        mostrarResumen(listaTareas[indice]);

        const confirmacion = prompt("¿Estás seguro? (SI/NO): ").toUpperCase();

        if (confirmacion === "SI") {
            // ELIMINACIÓN REAL: Borra 1 elemento en la posición 'indice'
            listaTareas.splice(indice, 1); 
            
            // ACTUALIZACIÓN DE PERSISTENCIA
            guardarEnArchivo(); 
            
            console.log("\n¡Tarea eliminada con éxito!");
        } else {
            console.log("\nOperación cancelada.");
        }
    } else if (seleccion !== 0) {
        console.log("Selección inválida.");
    }

    prompt("\nPresione ENTER para continuar...");
}