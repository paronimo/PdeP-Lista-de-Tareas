"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.solicitarDueDate = void 0;
exports.crearTarea = crearTarea;
exports.mostrarResumen = mostrarResumen;
exports.solicitarTitulo = solicitarTitulo;
exports.solicitarDescripcion = solicitarDescripcion;
exports.solicitarDificultad = solicitarDificultad;
exports.solicitarEstado = solicitarEstado;
exports.solicitarFechaVencimiento = solicitarFechaVencimiento;
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const uuid_1 = require("uuid");
const Tarea_1 = require("./models/Tarea");
const prompt = (0, prompt_sync_1.default)({ sigint: true });
const MAX_TAREAS = 100;
// Crea una nueva tarea interactiva usando el servicio proporcionado
function crearTarea(service) {
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
    const tarea = new Tarea_1.Tarea({
        id: (0, uuid_1.v4)().slice(0, 6),
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
    }
    else {
        console.log("\nTarea cancelada.");
    }
}
function mostrarResumen(t) {
    console.log("----------------------------------------");
    console.log("ID: " + t.id);
    console.log(`Título: ${t.titulo}`);
    console.log(`Descripción: ${t.descripcion}`);
    const dificultadTexto = ["Facilísimo", "Fácil", "Medio", "Complicado", "Difícilísimo"][Math.min(Math.max(t.dificultad, 1), 5) - 1];
    console.log(`Dificultad: ${"§".repeat(Math.min(Math.max(t.dificultad, 1), 5))} (${dificultadTexto})`);
    const fecha = t.createdAt;
    console.log(`Creada el: ${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getFullYear()}`);
    console.log(`Estado: ${t.estado}`);
    if (t.dueDate) {
        const d = t.dueDate;
        console.log(`Vencimiento: ${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`);
    }
    else {
        console.log("Vencimiento: Sin fecha definida");
    }
    console.log("----------------------------------------\n");
}
// Helpers interactivos que validan entrada y modifican la tarea pasada
function solicitarTitulo() {
    let input = "";
    do {
        input = prompt("Título de la tarea: ").trim();
        if (!input)
            console.log("El título no puede estar vacío.");
    } while (!input);
    return input;
}
function solicitarDescripcion() {
    const input = prompt("Descripción: ").trim();
    return input;
}
function solicitarDificultad() {
    let val;
    do {
        console.log("\n1 = § = Facilisimo\n2 = §§ = Fácil\n3 = §§§ = Medio\n4 = §§§§ = Complicado\n5 = §§§§§ = Difícilísimo");
        val = parseInt(prompt("Seleccione su dificultad (1-5): "));
        if (Number.isNaN(val) || val < 1 || val > 5)
            console.log("Dificultad inválida. Intente de nuevo.");
    } while (Number.isNaN(val) || val < 1 || val > 5);
    return val;
}
function solicitarEstado() {
    let opcion;
    do {
        console.log("\n1 = Pendiente\n2 = En curso\n3 = Terminada");
        opcion = parseInt(prompt("Seleccione el estado: "));
        if (Number.isNaN(opcion) || opcion < 1 || opcion > 3)
            console.log("Estado inválido. Intente de nuevo.");
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
function solicitarFechaVencimiento() {
    const deseo = parseInt(prompt("¿Quiere fecha de vencimiento? SI(1) / NO(2): "));
    if (Number.isNaN(deseo) || (deseo !== 1 && deseo !== 2))
        return null;
    if (deseo === 1) {
        let dia, mes, anio;
        do {
            dia = parseInt(prompt("Ingrese día: "));
            mes = parseInt(prompt("Ingrese mes: "));
            anio = parseInt(prompt("Ingrese año: "));
            if (Number.isNaN(dia) ||
                Number.isNaN(mes) ||
                Number.isNaN(anio) ||
                dia <= 0 ||
                dia > 31 ||
                mes <= 0 ||
                mes > 12 ||
                anio < 1970) {
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
exports.solicitarDueDate = solicitarFechaVencimiento;
