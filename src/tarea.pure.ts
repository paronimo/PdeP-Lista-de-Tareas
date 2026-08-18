import { Tarea, FechaVencimiento, EstadoTarea } from "./types";

export const crearTareaVacia = (id: string): Tarea => ({
  id,
  titulo: "",
  descripcion: "",
  dificultad: 1,
  estado: "Pendiente",
});

export const setTitulo = (t: Tarea, titulo: string): Tarea => ({ ...t, titulo });

export const mapearEstado = (opt: number): EstadoTarea => {
  switch (opt) {
    case 1:
      return "Pendiente";
    case 2:
      return "En curso";
    default:
      return "Terminada";
  }
};

export const obtenerTextoDificultad = (d: number): string => {
  const nombres = ["", "Facilísimo", "Fácil", "Medio", "Complicado", "Difícilísimo"];
  return nombres[Math.min(Math.max(d, 1), 5)];
};
