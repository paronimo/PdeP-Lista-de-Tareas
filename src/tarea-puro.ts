import { Tarea, EstadoTarea, FechaVencimiento } from "./types";

/** Crea un objeto Tarea con valores por defecto (Pura) */
export const crearTareaVacia = (id: string): Tarea => ({
  id,
  titulo: "",
  descripcion: "",
  dificultad: 1,
  estado: "Pendiente"
});

/** Retorna una nueva lista con la tarea agregada si no supera el límite (Pura) */
export const agregarTarea = (lista: readonly Tarea[], nuevaTarea: Tarea, maximo: number = 100): readonly Tarea[] => {
  if (lista.length >= maximo) return lista;
  return [...lista, nuevaTarea];
};

/** Retorna una nueva tarea con el título asignado (Pura) */
export const setTitulo = (tarea: Tarea, titulo: string): Tarea => ({
  ...tarea,
  titulo: titulo.trim()
});

/** Mapea el número ingresado a un estado válido (Pura) */
export const mapearEstado = (opcion: number): EstadoTarea => {
  const estados: Record<number, EstadoTarea> = {
    1: "Pendiente",
    2: "En curso",
    3: "Terminada"
  };
  return estados[opcion] ?? "Pendiente";
};

/** Retorna la representación visual formateada de la dificultad (Pura) */
export const obtenerTextoDificultad = (dificultad: number): string => {
  const opciones = ["Facilisimo", "Facil", "Medio", "Complicado", "Dificilisimo"];
  const index = Math.max(1, Math.min(dificultad, 5)) - 1;
  return `${"§".repeat(index + 1)} (${opciones[index]})`;
};