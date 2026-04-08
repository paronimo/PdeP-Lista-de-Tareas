import { listaTareas, cantidadTareas, pedirTitulo, pedirDescripcion, pedirDificultad, pedirEstado, pedirFechaVencimiento } from "./crear";
import promptSync from "prompt-sync";
const prompt = promptSync({ sigint: true });

export function editarTarea(): void {
        console.clear();
    
        if (cantidadTareas === 0) {
        console.log("No hay tareas registradas.");
        return;
        }
    
        console.log("\n--- EDITAR TAREA ---");
        for (let i = 0; i < cantidadTareas; i++) {
        console.log(`${i + 1}. ${listaTareas[i].titulo}`);
        }
    
        const seleccion = parseInt(prompt("Seleccione el número (0 para volver): ")) - 1;
    
        if (seleccion >= 0 && seleccion < cantidadTareas) {
        let tarea = listaTareas[seleccion];
        console.log(`\nEditando: ${tarea.titulo}\n`);
        pedirTitulo(tarea);
        pedirDescripcion(tarea);
        pedirDificultad(tarea);
        pedirEstado(tarea);
        pedirFechaVencimiento(tarea);
        console.log("¡Tarea editada con éxito!");
        } else if (seleccion !== -1) {
        console.log("Número inválido.");
    }
        prompt("ENTER para continuar...");
    }
