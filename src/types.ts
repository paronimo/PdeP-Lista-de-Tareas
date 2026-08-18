export type FechaVencimiento = { dia: number; mes: number; anio: number } | null;

export type EstadoTarea = "Pendiente" | "En curso" | "Terminada";

export type Tarea = {
  id: string;
  titulo: string;
  descripcion: string;
  dificultad: number;
  estado: EstadoTarea;
  vencimiento?: FechaVencimiento;
};
