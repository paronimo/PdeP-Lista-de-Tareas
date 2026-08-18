import promptSync from "prompt-sync";
import { v4 as uuidv4 } from "uuid";
import { Tarea, TaskStatus } from "./models/Tarea";
import { TareaService } from "./services/TareaService";

const prompt = promptSync({ sigint: true });
const MAX_TAREAS = 100;

// Crea una nueva tarea interactiva usando el servicio proporcionado
export function crearTarea(service: TareaService): void {
  if (!service.canAddTask()) {
    console.log("No se pueden agregar más tareas.");
    return;
  }

  console.clear();
  console.log("Creando una nueva tarea...\n");

  const titulo = solicitarTitulo();
  const descripcion = solicitarDescripcion();
  const dificultad = solicitarDificultad();
  const estado = solicitarEstado();
  const dueDate = solicitarFechaVencimiento();

  const tarea = new Tarea({
    id: uuidv4().slice(0, 6),
    titulo,
    descripcion,
    dificultad,
    estado,
    createdAt: new Date(),
    dueDate,
  });

  console.clear();
  mostrarResumen(tarea);

  const confirm = parseInt(prompt("¿Confirmar tarea? SI(1) / NO(2): "));
  if (confirm === 1) {
    service.addTask(tarea);
    console.log("\n¡Tarea guardada exitosamente!\n");
  } else {
    console.log("\nTarea cancelada.");
  }
}

export function mostrarResumen(t: Tarea): void {
  console.log("----------------------------------------");
  console.log("ID: " + t.id);
  console.log(`Título: ${t.titulo}`);
  console.log(`Descripción: ${t.descripcion}`);

  const dificultadTexto = ["Facilísimo", "Fácil", "Medio", "Complicado", "Difícilísimo"][
    Math.min(Math.max(t.dificultad, 1), 5) - 1
  ];
  console.log(`Dificultad: ${"§".repeat(Math.min(Math.max(t.dificultad, 1), 5))} (${dificultadTexto})`);

  const fecha = t.createdAt;
  console.log(`Creada el: ${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getFullYear()}`);
  console.log(`Estado: ${t.estado}`);

  if (t.dueDate) {
    const d = t.dueDate;
    console.log(`Vencimiento: ${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`);
  } else {
    console.log("Vencimiento: Sin fecha definida");
  }
  console.log("----------------------------------------\n");
}

// Helpers interactivos que validan entrada y modifican la tarea pasada
export function solicitarTitulo(): string {
  let input = "";
  do {
    input = prompt("Título de la tarea: ").trim();
    if (!input) console.log("El título no puede estar vacío.");
  } while (!input);
  return input;
}

export function solicitarDescripcion(): string {
  const input = prompt("Descripción: ").trim();
  return input;
}

export function solicitarDificultad(): number {
  let val: number;
  do {
    console.log(
      "\n1 = § = Facilisimo\n2 = §§ = Fácil\n3 = §§§ = Medio\n4 = §§§§ = Complicado\n5 = §§§§§ = Difícilísimo"
    );
    val = parseInt(prompt("Seleccione su dificultad (1-5): "));
    if (Number.isNaN(val) || val < 1 || val > 5) console.log("Dificultad inválida. Intente de nuevo.");
  } while (Number.isNaN(val) || val < 1 || val > 5);
  return val;
}

export function solicitarEstado(): TaskStatus {
  let opcion: number;
  do {
    console.log("\n1 = Pendiente\n2 = En curso\n3 = Terminada");
    opcion = parseInt(prompt("Seleccione el estado: "));
    if (Number.isNaN(opcion) || opcion < 1 || opcion > 3) console.log("Estado inválido. Intente de nuevo.");
  } while (Number.isNaN(opcion) || opcion < 1 || opcion > 3);

  switch (opcion) {
    case 1:
      return "Pendiente";
    case 2:
      return "En curso";
    default:
      return "Terminada";
  }
}

export function solicitarFechaVencimiento(): Date | null {
  const deseo = parseInt(prompt("¿Quiere fecha de vencimiento? SI(1) / NO(2): "));
  if (Number.isNaN(deseo) || (deseo !== 1 && deseo !== 2)) return null;

  if (deseo === 1) {
    let dia: number, mes: number, anio: number;
    do {
      dia = parseInt(prompt("Ingrese día: "));
      mes = parseInt(prompt("Ingrese mes: "));
      anio = parseInt(prompt("Ingrese año: "));
      if (
        Number.isNaN(dia) ||
        Number.isNaN(mes) ||
        Number.isNaN(anio) ||
        dia <= 0 ||
        dia > 31 ||
        mes <= 0 ||
        mes > 12 ||
        anio < 1970
      ) {
        console.log("Fecha inválida. Intente nuevamente.\n");
        continue;
      }
      // Construir Date (mes - 1 porque en JS Date los meses son 0-11)
      const fecha = new Date(anio, mes - 1, dia);
      return fecha;
    } while (true);
  }

  return null;
}

// Alias para compatibilidad con código anterior
export const solicitarDueDate = solicitarFechaVencimiento;
