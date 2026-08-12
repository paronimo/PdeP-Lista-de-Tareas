import fs from "fs";
import path from "path";
import { Tarea } from "../models/Tarea";

export interface TareaRepository {
  load(): Tarea[];
  save(tasks: Tarea[]): void;
}

export class JsonTareaRepository implements TareaRepository {
  private readonly filePath: string;

  constructor(filePath?: string) {
    this.filePath = path.resolve(process.cwd(), filePath ?? "tarea.json");
  }

  load(): Tarea[] {
    try {
      if (!fs.existsSync(this.filePath)) {
        return [];
      }

      const raw = fs.readFileSync(this.filePath, "utf-8").trim();
      if (raw.length === 0) {
        return [];
      }
//explicacion: Esta función carga las tareas desde un archivo JSON. Primero verifica si el archivo existe y si no, devuelve un arreglo vacío. Luego lee el contenido del archivo y lo convierte en un arreglo de objetos Tarea usando el método fromObject de la clase Tarea. Si ocurre algún error durante la lectura o el parseo del archivo, se captura y se imprime un mensaje de error, devolviendo un arreglo vacío.
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) {
        return [];
      }

      return parsed.map((item: any) => Tarea.fromObject(item));
    } catch (error) {
      console.error("Error loading tasks from disk:", error);
      return [];
    }
  }

  save(tasks: Tarea[]): void {
    try {
      const data = JSON.stringify(tasks.map((task) => task.toJSON()), null, 2);
      fs.writeFileSync(this.filePath, data, "utf-8");
    } catch (error) {
      console.error("Error saving tasks to disk:", error);
    }
  }
}
