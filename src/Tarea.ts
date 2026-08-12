import promptSync from "prompt-sync";
import { JsonTareaRepository } from "./repositories/TareaRepository";
import { TareaService } from "./services/TareaService";
import { crearTarea } from "./crear";
import { buscarfiltro } from "./filtros";
import { buscarTarea } from "./buscar";
import { editarTarea } from "./editar";
import { eliminar } from "./eliminarS";

const prompt = promptSync({ sigint: true });

function main(): void {
  const repository = new JsonTareaRepository();
  const service = new TareaService(repository);
  let opc: number;

  do {
    console.log("\n--- MENÚ PRINCIPAL ---");
    console.log("0. Salir\n1. Crear tarea\n2. Filtrar tareas\n3. Buscar tarea\n4. Editar tarea\n5. Eliminar la tarea");
    opc = parseInt(prompt("Seleccione una opción: "));

    switch (opc) {
      case 0:
        console.log("¡Hasta luego!");
        break;
      case 1:
        crearTarea(service);
        break;
      case 2:
        buscarfiltro(service);
        break;
      case 3:
        buscarTarea(service);
        break;
      case 4:
        editarTarea(service);
        break;
      case 5:
        eliminar(service);
        break;
      default:
        console.log("Opción inválida.");
    }
  } while (opc !== 0);
}

main();
