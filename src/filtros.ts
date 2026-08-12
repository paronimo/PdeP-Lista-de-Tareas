import promptSync from "prompt-sync";
import { TareaService } from "./services/TareaService";
import { TaskStatus } from "./models/Tarea";
import { mostrarResumen } from "./crear";

const prompt = promptSync({ sigint: true });

export function buscarfiltro(service: TareaService): void {
  console.clear();
  console.log("\n--- FILTRAR TAREA ---");
  let opc: number;

  do {
    console.log("0. volver\n1. Por Estado\n2. Por Dificultad");
    opc = parseInt(prompt("Seleccione una opción: "));

    switch (opc) {
      case 0:
        break;
      case 1:
        FilEstado(service);
        break;
      case 2:
        FilDificultad(service);
        break;
      default:
        console.log("Opción inválida.");
    }
  } while (opc !== 0);
}

function FilEstado(service: TareaService): void {
  console.clear();
  const estado = prompt("Ingrese el estado a filtrar: ").trim();
  const estadoNormalizado = normalizarEstado(estado);

  if (!estadoNormalizado) {
    console.log("Estado inválido.");
    return;
  }

  const tareasFiltradas = service.filterByStatus(estadoNormalizado);
  if (tareasFiltradas.length === 0) {
    console.log("No se encontraron tareas con ese estado.");
    return;
  }

  console.log(`\n--- TAREAS CON ESTADO "${estadoNormalizado}" ---`);
  tareasFiltradas.forEach((tarea, index) => {
    console.log(`${index + 1}. ${tarea.titulo}`);
    mostrarResumen(tarea);
  });
}

function FilDificultad(service: TareaService): void {
  console.clear();
  const dificultad = parseInt(prompt("Ingrese la dificultad a filtrar: "));
  if (Number.isNaN(dificultad) || dificultad < 1 || dificultad > 5) {
    console.log("Dificultad inválida.");
    return;
  }

  const tareasFiltradas = service.filterByDifficulty(dificultad);
  if (tareasFiltradas.length === 0) {
    console.log("No se encontraron tareas con esa dificultad.");
    return;
  }

  const nombres = ["", "Facilísimo", "Fácil", "Medio", "Complicado", "Difícilísimo"];
  console.log(`\n--- TAREAS CON DIFICULTAD: ${nombres[dificultad]} (${dificultad}) ---`);
  tareasFiltradas.forEach((tarea, index) => {
    console.log(`${index + 1}. ${tarea.titulo}`);
    mostrarResumen(tarea);
  });
}

function normalizarEstado(estado: string): TaskStatus | null {
  const estadoLower = estado.toLowerCase();
  if (estadoLower === "pendiente") return "Pendiente";
  if (estadoLower === "en curso" || estadoLower === "encurso") return "En curso";
  if (estadoLower === "terminada" || estadoLower === "terminado") return "Terminada";
  return null;
}
