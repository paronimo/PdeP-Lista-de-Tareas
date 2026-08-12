import { Tarea } from "../models/Tarea";

export function mostrarResumen(tarea: Tarea): void {
  console.log("----------------------------------------");
  console.log("ID: " + tarea.id);
  console.log(`Título: ${tarea.titulo}`);
  console.log(`Descripción: ${tarea.descripcion}`);
  console.log(`Dificultad: ${"§".repeat(tarea.dificultad)} (${tarea.dificultad})`);
  console.log(`Creada el: ${tarea.createdAt.getDate()}/${tarea.createdAt.getMonth() + 1}/${tarea.createdAt.getFullYear()}`);
  console.log(`Estado: ${tarea.estado}`);
  if (tarea.dueDate) {
    console.log(`Vencimiento: ${tarea.dueDate.getDate()}/${tarea.dueDate.getMonth() + 1}/${tarea.dueDate.getFullYear()}`);
  } else {
    console.log("Vencimiento: Sin fecha definida");
  }
  console.log("----------------------------------------\n");
}
