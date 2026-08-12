import promptSync from "prompt-sync";
import { TareaService } from "./services/TareaService";
import { mostrarResumen } from "./crear";

const prompt = promptSync({ sigint: true });

export function buscarTarea(service: TareaService): void {
  console.clear();

  const tareas = service.getAll();
  if (tareas.length === 0) {
    console.log("No hay tareas registradas.");
    return;
  }

  console.log("\n--- BUSCAR TAREA ---");
  tareas.forEach((tarea, index) => {
    console.log(`${index + 1}. ${tarea.titulo}`);
  });

  const seleccion = parseInt(prompt("Seleccione el ID de tarea (0 para volver): "));

  if (seleccion > 0 && seleccion <= tareas.length) {
    console.clear();
    mostrarResumen(tareas[seleccion - 1]);
  } else if (seleccion !== 0) {
    console.log("Número inválido.");
  }

  prompt("ENTER para continuar...");
}
