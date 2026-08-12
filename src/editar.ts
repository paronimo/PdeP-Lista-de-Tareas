import promptSync from "prompt-sync";
import { TareaService } from "./services/TareaService";
import {
  mostrarResumen,
  solicitarTitulo,
  solicitarDescripcion,
  solicitarDificultad,
  solicitarEstado,
  solicitarDueDate,
} from "./crear";

const prompt = promptSync({ sigint: true });

export function editarTarea(service: TareaService): void {
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

    tarea.titulo = solicitarTitulo();
    tarea.descripcion = solicitarDescripcion();
    tarea.dificultad = solicitarDificultad();
    tarea.estado = solicitarEstado();
    tarea.dueDate = solicitarDueDate();

    service.updateTask(tarea);
    console.log("¡Tarea editada con éxito!");
  } else if (seleccion !== -1) {
    console.log("Número inválido.");
  }

  prompt("ENTER para continuar...");
}
