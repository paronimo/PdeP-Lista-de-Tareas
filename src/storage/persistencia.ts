import fs from "fs";
import { Tarea } from "../models/Tarea";

export const guardarTareasJSON = (ruta: string, tareas: readonly Tarea[]): boolean => {
  try {
    fs.writeFileSync(ruta, JSON.stringify(tareas, null, 2), "utf-8");
    return true;
  } catch (error) {
    console.error("Error al guardar tareas:", error);
    return false;
  }
};
/*export function guardarEnArchivo(): void {
    try {
        const data = JSON.stringify(listaTareas, null, 2); // Convierte el array a texto bonito
        fs.writeFileSync(ARCHIVO_JSON, data, 'utf-8');
    } catch (error) {
        console.error("Error al guardar el archivo:", error);
    }
}*/

export const cargarTareasJSON = (ruta: string): Tarea[] => {
  try {
    if (!fs.existsSync(ruta)) return [];
    const raw = fs.readFileSync(ruta, "utf-8").trim();
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    console.error("Error al cargar tareas:", error);
    return [];
  }
};