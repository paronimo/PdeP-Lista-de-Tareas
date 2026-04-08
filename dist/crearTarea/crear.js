"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.crearTarea = crearTarea;
exports.darID = darID;
exports.pedirTitulo = pedirTitulo;
exports.pedirDescripcion = pedirDescripcion;
exports.pedirDificultad = pedirDificultad;
exports.pedirEstado = pedirEstado;
exports.pedirFechaVencimiento = pedirFechaVencimiento;
exports.mostrarResumen = mostrarResumen;
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const prompt = (0, prompt_sync_1.default)({ sigint: true });
const MAX_TAREAS = 100;
let listaTareas = [];
let cantidadTareas = 0;
function crearTarea() {
    if (cantidadTareas >= MAX_TAREAS) {
        console.log("No se pueden agregar más tareas.");
        return;
    }
    console.clear();
    console.log("Creando una nueva tarea...\n");
    let tarea = {
        ID: "",
        titulo: "",
        descripcion: "",
        dificultad: 1,
        estado: "Pendiente",
        preguntaFecha: 2
    };
    darID(tarea);
    pedirTitulo(tarea);
    pedirDescripcion(tarea);
    pedirDificultad(tarea);
    pedirEstado(tarea);
    pedirFechaVencimiento(tarea);
    console.clear();
    mostrarResumen(tarea);
    const confirm = parseInt(prompt("¿Confirmar tarea? SI(1) / NO(2): "));
    if (confirm === 1) {
        listaTareas.push(tarea);
        cantidadTareas++;
        console.log("\n¡Tarea guardada exitosamente!\n");
    }
    else {
        console.log("\nTarea cancelada.");
    }
}
function darID(t) {
    import { v4 as uuidv4 } from 'uuid';
    tarea.ID = (0, uuid_1.v4)();
    return (cantidadTareas + 1) + "ID";
}
function pedirTitulo(t) {
    t.titulo = prompt("Título de la tarea: ");
}
function pedirDescripcion(t) {
    t.descripcion = prompt("Descripción: ");
}
function pedirDificultad(t) {
    do {
        console.log("\n1 = § = Facilisimo\n2 = §§ = Facil\n3 = §§§ = Medio\n4 = §§§§ = Complicado\n5 = §§§§§ = Dificilisimo");
        t.dificultad = parseInt(prompt("Seleccione su dificultad (1-5): "));
    } while (t.dificultad < 1 || t.dificultad > 5);
}
function pedirEstado(t) {
    let opcion;
    do {
        console.log("\n1 = Pendiente\n2 = En curso\n3 = Terminada");
        opcion = parseInt(prompt("Seleccione el estado: "));
    } while (opcion < 1 || opcion > 3);
    switch (opcion) {
        case 1:
            t.estado = "Pendiente";
            break;
        case 2:
            t.estado = "En curso";
            break;
        case 3:
            t.estado = "Terminada";
            break;
    }
}
function pedirFechaVencimiento(t) {
    const desea = parseInt(prompt("¿Quiere fecha de vencimiento? SI(1) / NO(2): "));
    t.preguntaFecha = desea;
    if (desea === 1) {
        let confirm = 0;
        do {
            t.dia = parseInt(prompt("Ingrese día: "));
            t.mes = parseInt(prompt("Ingrese mes: "));
            t.anio = parseInt(prompt("Ingrese año: "));
            if (t.dia > 31 || t.dia <= 0 || t.mes > 12 || t.mes <= 0 || t.anio < 2025) {
                console.log("Fecha inválida. Intente nuevamente.\n");
                continue;
            }
            console.log(`Fecha ingresada: ${t.dia}/${t.mes}/${t.anio}`);
            confirm = parseInt(prompt("¿Confirmar? SI(1) / NO(2): "));
        } while (confirm !== 1);
    }
}
function mostrarResumen(t) {
    console.log("----------------------------------------");
    console.log(`ID: ${t.ID}`);
    console.log(`Título: ${t.titulo}`);
    console.log(`Descripción: ${t.descripcion}`);
    const dificultadTexto = ["Facilisimo", "Facil", "Medio", "Complicado", "Dificilisimo"][t.dificultad - 1];
    console.log(`Dificultad: ${"§".repeat(t.dificultad)} (${dificultadTexto})`);
    const fecha = new Date();
    console.log(`Creada el: ${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getFullYear()}`);
    console.log(`Estado: ${t.estado}`);
    if (t.preguntaFecha === 1 && t.dia && t.mes && t.anio) {
        console.log(`Vencimiento: ${t.dia}/${t.mes}/${t.anio}`);
    }
    else {
        console.log("Vencimiento: Sin fecha definida");
    }
    console.log("----------------------------------------\n");
}
