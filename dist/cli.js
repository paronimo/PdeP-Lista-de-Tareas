"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.imprimirResumenTarea = exports.capturarTareaPorConsola = void 0;
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const uuid_1 = require("uuid");
const tarea_pure_1 = require("./tarea.pure");
const prompt = (0, prompt_sync_1.default)({ sigint: true });
const capturarTareaPorConsola = () => {
    console.clear();
    console.log("--- CREAR NUEVA TAREA ---\n");
    let tarea = (0, tarea_pure_1.crearTareaVacia)((0, uuid_1.v4)().slice(0, 6));
    const titulo = prompt("Título de la tarea: ");
    tarea = (0, tarea_pure_1.setTitulo)(tarea, titulo);
    const descripcion = prompt("Descripción: ");
    tarea = Object.assign(Object.assign({}, tarea), { descripcion });
    let dif = 1;
    do {
        console.log("\n1=§ (Facilisimo) | 2=§§ (Facil) | 3=§§§ (Medio) | 4=§§§§ (Complicado) | 5=§§§§§ (Dificilisimo)");
        dif = parseInt(prompt("Seleccione dificultad (1-5): "));
    } while (isNaN(dif) || dif < 1 || dif > 5);
    tarea = Object.assign(Object.assign({}, tarea), { dificultad: dif });
    let estOpt = 1;
    do {
        console.log("\n1 = Pendiente | 2 = En curso | 3 = Terminada");
        estOpt = parseInt(prompt("Seleccione el estado: "));
    } while (isNaN(estOpt) || estOpt < 1 || estOpt > 3);
    tarea = Object.assign(Object.assign({}, tarea), { estado: (0, tarea_pure_1.mapearEstado)(estOpt) });
    const quiereVencimiento = prompt("¿Tiene fecha de vencimiento? SI(1) / NO(2): ") === "1";
    if (quiereVencimiento) {
        const dia = parseInt(prompt("Día: "));
        const mes = parseInt(prompt("Mes: "));
        const anio = parseInt(prompt("Año: "));
        if (dia > 0 && dia <= 31 && mes > 0 && mes <= 12 && anio >= 2025) {
            tarea = Object.assign(Object.assign({}, tarea), { vencimiento: { dia, mes, anio } });
        }
    }
    return tarea;
};
exports.capturarTareaPorConsola = capturarTareaPorConsola;
const imprimirResumenTarea = (tarea) => {
    console.log("\n----------------------------------------");
    console.log(`ID: ${tarea.id}`);
    console.log(`Título: ${tarea.titulo}`);
    console.log(`Descripción: ${tarea.descripcion}`);
    console.log(`Dificultad: ${(0, tarea_pure_1.obtenerTextoDificultad)(tarea.dificultad)}`);
    console.log(`Estado: ${tarea.estado}`);
    if (tarea.vencimiento) {
        const { dia, mes, anio } = tarea.vencimiento;
        console.log(`Vencimiento: ${dia}/${mes}/${anio}`);
    }
    else {
        console.log("Vencimiento: Sin fecha definida");
    }
    console.log("----------------------------------------\n");
};
exports.imprimirResumenTarea = imprimirResumenTarea;
