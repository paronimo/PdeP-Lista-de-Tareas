
/*1)Instalar prompt-sync → npm install prompt-sync
  2)Compilar: tsc tareas.ts
  3)Ejecutar: node tareas.js */

//menu principal
function main(): void {
  let opc: number;

  do {
    console.log("\n--- MENÚ PRINCIPAL ---");
    console.log("0. Salir\n1. Crear tarea\n2. Ver tareas\n3. Buscar tarea\n4. Editar tarea");
    opc = parseInt(prompt("Seleccione una opción: "));

    switch (opc) {
      case 0: console.log("¡Hasta luego!"); break;
      case 1: crearTarea(); break;
      case 2: verTareas(); break;
      case 3: buscarTarea(); break;
      case 4: editarTarea(); break;
      default: console.log("Opción inválida.");
    }
  } while (opc !== 0);
}

main();
