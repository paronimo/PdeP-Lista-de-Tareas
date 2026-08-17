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
//explicacion: Esta función load() intenta cargar las tareas desde un archivo JSON en el disco. Primero, 
// verifica si el archivo existe; si no, devuelve un array vacío. Luego, lee el contenido del archivo y lo convierte en 
// una cadena de texto. Si la cadena está vacía, también devuelve un array vacío. A continuación, intenta analizar la 
// cadena JSON en un objeto JavaScript. Si el objeto resultante no es un array, devuelve un array vacío. Finalmente, 
// mapea cada elemento del array a una instancia de la clase Tarea utilizando el método estático fromObject() y devuelve 
// el array de tareas.
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
