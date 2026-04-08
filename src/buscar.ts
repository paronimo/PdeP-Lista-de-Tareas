import { listaTareas, cantidadTareas, mostrarResumen } from "./crear";
import promptSync from "prompt-sync";
const prompt = promptSync({ sigint: true });

export function buscarTarea(): void {
    console.clear();

    if (cantidadTareas === 0) {
    console.log("No hay tareas registradas.");
    return;
}

    console.log("\n--- BUSCAR TAREA ---");
    for (let i = 0; i < cantidadTareas; i++) {
    console.log(`${i + 1}. ${listaTareas[i].titulo}`);
}

    const seleccion = parseInt(prompt("Seleccione el ID de tarea (0 para volver): "));

    if (seleccion > 0 && seleccion <= cantidadTareas) {
    console.clear();
    mostrarResumen(listaTareas[seleccion - 1]);
    } else if (seleccion !== 0) {
    console.log("Número inválido.");
    }
    prompt("ENTER para continuar...");
}
