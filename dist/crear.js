"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.crearTarea = crearTarea;
exports.mostrarResumen = mostrarResumen;
exports.solicitarTitulo = solicitarTitulo;
exports.solicitarDescripcion = solicitarDescripcion;
exports.solicitarDificultad = solicitarDificultad;
exports.solicitarEstado = solicitarEstado;
exports.solicitarDueDate = solicitarDueDate;
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const uuid_1 = require("uuid");
const Tarea_1 = require("./models/Tarea");
const prompt = (0, prompt_sync_1.default)({ sigint: true });
function crearTarea(service) {
    if (!service.canAddTask()) {
        console.log("No se pueden agregar más tareas.");
        return;
    }
    console.clear();
    console.log("Creando una nueva tarea...\n");
    const tarea = new Tarea_1.Tarea({
        id: (0, uuid_1.v4)().slice(0, 6),
        titulo: solicitarTitulo(),
        descripcion: solicitarDescripcion(),
        dificultad: solicitarDificultad(),
        estado: solicitarEstado(),
        createdAt: new Date(),
        dueDate: solicitarDueDate(),
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
function mostrarResumen(tarea) {
    console.log("----------------------------------------");
    console.log("ID: " + tarea.id);
    console.log(`Título: ${tarea.titulo}`);
    console.log(`Descripción: ${tarea.descripcion}`);
    const dificultadTexto = ["Facilisimo", "Facil", "Medio", "Complicado", "Dificilisimo"][tarea.dificultad - 1];
    console.log(`Dificultad: ${"§".repeat(tarea.dificultad)} (${dificultadTexto})`);
    console.log(`Creada el: ${tarea.createdAt.getDate()}/${tarea.createdAt.getMonth() + 1}/${tarea.createdAt.getFullYear()}`);
    console.log(`Estado: ${tarea.estado}`);
    if (tarea.dueDate) {
        console.log(`Vencimiento: ${tarea.dueDate.getDate()}/${tarea.dueDate.getMonth() + 1}/${tarea.dueDate.getFullYear()}`);
    }
    else {
        console.log("Vencimiento: Sin fecha definida");
    }
    console.log("----------------------------------------\n");
}
function solicitarTitulo() {
    return prompt("Título de la tarea: ").trim();
}
function solicitarDescripcion() {
    return prompt("Descripción: ").trim();
}
function solicitarDificultad() {
    let dificultad;
    do {
        console.log("\n1 = § = Facilisimo\n2 = §§ = Facil\n3 = §§§ = Medio\n4 = §§§§ = Complicado\n5 = §§§§§ = Dificilisimo");
        dificultad = parseInt(prompt("Seleccione su dificultad (1-5): "));
    } while (Number.isNaN(dificultad) || dificultad < 1 || dificultad > 5);
    return dificultad;
}
function solicitarEstado() {
    let opcion;
    do {
        console.log("\n1 = Pendiente\n2 = En curso\n3 = Terminada");
        opcion = parseInt(prompt("Seleccione el estado: "));
    } while (Number.isNaN(opcion) || opcion < 1 || opcion > 3);
    switch (opcion) {
        case 1:
            return "Pendiente";
        case 2:
            return "En curso";
        case 3:
            return "Terminada";
        default:
            return "Pendiente";
    }
}
function solicitarDueDate() {
    const desea = parseInt(prompt("¿Quiere fecha de vencimiento? SI(1) / NO(2): "));
    if (Number.isNaN(desea) || desea !== 1) {
        return null;
    }
    while (true) {
        const dia = parseInt(prompt("Ingrese día: "));
        const mes = parseInt(prompt("Ingrese mes: "));
        const anio = parseInt(prompt("Ingrese año: "));
        if (Number.isNaN(dia) || Number.isNaN(mes) || Number.isNaN(anio)) {
            console.log("Fecha inválida. Intente nuevamente.\n");
            continue;
        }
        const fecha = new Date(anio, mes - 1, dia);
        if (fecha.getFullYear() !== anio || fecha.getMonth() !== mes - 1 || fecha.getDate() !== dia || anio < 2025) {
            console.log("Fecha inválida. Intente nuevamente.\n");
            continue;
        }
        console.log(`Fecha ingresada: ${dia}/${mes}/${anio}`);
        const confirm = parseInt(prompt("¿Confirmar? SI(1) / NO(2): "));
        if (confirm === 1) {
            return fecha;
        }
    }
}
