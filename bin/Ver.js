"use strict";
class Ver {
}
function verTareas() {
    console.clear();
    if (cantidadTareas === 0) {
        console.log("No hay tareas registradas.");
        return;
    }
    let opcion;
    do {
        console.log("\n--- VER TAREAS ---");
        console.log("(0) Volver\n(1) Todas\n(2) Pendientes\n(3) En curso\n(4) Terminadas");
        opcion = parseInt(prompt("Seleccione una opción: "));
        switch (opcion) {
            case 0: return;
            case 1:
                mostrarPorEstado("Todas");
                break;
            case 2:
                mostrarPorEstado("Pendiente");
                break;
            case 3:
                mostrarPorEstado("En curso");
                break;
            case 4:
                mostrarPorEstado("Terminada");
                break;
            default: console.log("Opción inválida.");
        }
    } while (opcion !== 0);
}
function mostrarPorEstado(estado) {
    console.clear();
    console.log(`\n--- ${estado === "Todas" ? "Todas las tareas" : "Tareas " + estado} ---\n`);
    let encontradas = false;
    for (let i = 0; i < cantidadTareas; i++) {
        if (estado === "Todas" || listaTareas[i].estado === estado) {
            mostrarResumen(listaTareas[i]);
            encontradas = true;
        }
    }
    if (!encontradas)
        console.log("No hay tareas en esta categoría.");
    prompt("ENTER para continuar...");
}
//buscar tarea
//editar tarea
function editarTarea() {
    console.clear();
    if (cantidadTareas === 0) {
        console.log("No hay tareas registradas.");
        return;
    }
    console.log("\n--- EDITAR TAREA ---");
    for (let i = 0; i < cantidadTareas; i++) {
        console.log(`${i + 1}. ${listaTareas[i].titulo}`);
    }
    const seleccion = parseInt(prompt("Seleccione el número (0 para volver): ")) - 1;
    if (seleccion >= 0 && seleccion < cantidadTareas) {
        let tarea = listaTareas[seleccion];
        console.log(`\nEditando: ${tarea.titulo}\n`);
        pedirTitulo(tarea);
        pedirDescripcion(tarea);
        pedirDificultad(tarea);
        pedirEstado(tarea);
        pedirFechaVencimiento(tarea);
        console.log("¡Tarea editada con éxito!");
    }
    else if (seleccion !== -1) {
        console.log("Número inválido.");
    }
    prompt("ENTER para continuar...");
}
