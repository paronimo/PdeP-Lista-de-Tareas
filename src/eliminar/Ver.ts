import { listaTareas, cantidadTareas, mostrarResumen } from "../crear";
import promptSync from "prompt-sync";
const prompt = promptSync({ sigint: true });

export function verTareas(): void {
console.clear();

listaTareas.forEach((t, i) => {
        console.log(`${i + 1}. [${t.ID}] ${t.titulo}`);
    });
let opcion: number;
do {
    console.log("\n--- VER TAREAS ---");
    console.log("(0) Volver\n(1) Todas\n(2) Pendientes\n(3) En curso\n(4) Terminadas");
    opcion = parseInt(prompt("Seleccione una opción: "));

    switch (opcion) {
        case 0: return;
        case 1: mostrarPorEstado("Todas"); break;
        case 2: mostrarPorEstado("Pendiente"); break;
        case 3: mostrarPorEstado("En curso"); break;
        case 4: mostrarPorEstado("Terminada"); break;
        default: console.log("Opción inválida.");
    }
} while (opcion !== 0);
}

export function mostrarPorEstado(estado: string): void {
console.clear();
console.log(`\n--- ${estado === "Todas" ? "Todas las tareas" : "Tareas " + estado} ---\n`);

let encontradas = false;
for (let i = 0; i < cantidadTareas; i++) {
    if (estado === "Todas" || listaTareas[i].estado === estado) {
    mostrarResumen(listaTareas[i]);
    encontradas = true;
    }
}
if (!encontradas) console.log("No hay tareas en esta categoría.");
prompt("ENTER para continuar...");
}
