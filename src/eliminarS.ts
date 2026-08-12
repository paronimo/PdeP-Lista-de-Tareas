import promptSync from "prompt-sync";
import { TareaService } from "./services/TareaService";
import { mostrarResumen } from "./crear";

const prompt = promptSync({ sigint: true });

export function eliminar(service: TareaService): void {
  console.clear();

  const tareas = service.getAll();
  if (tareas.length === 0) {
    console.log("No hay tareas para eliminar.");
    prompt("Presione ENTER para volver...");
    return;
  }

  console.log("\n--- ELIMINAR TAREA ---");
  tareas.forEach((tarea, index) => {
    console.log(`${index + 1}. [${tarea.id}] ${tarea.titulo}`);
  });

  const seleccion = parseInt(prompt("\nSeleccione el número de tarea a eliminar (0 para cancelar): "));

  if (seleccion > 0 && seleccion <= tareas.length) {
    const indice = seleccion - 1;
    const tarea = tareas[indice];

    console.clear();
    console.log("Vas a eliminar la siguiente tarea:");
    mostrarResumen(tarea);

    const confirmacion = prompt("¿Estás seguro? (SI/NO): ").toUpperCase();
    if (confirmacion === "SI") {
      service.deleteTask(tarea.id);
      console.log("\n¡Tarea eliminada con éxito!");
    } else {
      console.log("\nOperación cancelada.");
    }
  } else if (seleccion !== 0) {
    console.log("Selección inválida.");
  }

  prompt("\nPresione ENTER para continuar...");
}
