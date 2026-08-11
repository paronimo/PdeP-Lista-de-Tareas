"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cantidadTareas = exports.listaTareas = exports.Tarea = void 0;
exports.cargarDesdeArchivo = cargarDesdeArchivo;
exports.crearTarea = crearTarea;
exports.guardarEnArchivo = guardarEnArchivo;
exports.darID = darID;
exports.pedirTitulo = pedirTitulo;
exports.pedirDescripcion = pedirDescripcion;
exports.pedirDificultad = pedirDificultad;
exports.pedirEstado = pedirEstado;
exports.pedirFechaVencimiento = pedirFechaVencimiento;
exports.mostrarResumen = mostrarResumen;
/// <reference types="node" />
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const uuid_1 = require("uuid");
const fs_1 = __importDefault(require("fs"));
const prompt = (0, prompt_sync_1.default)({ sigint: true });
const MAX_TAREAS = 100;
const ARCHIVO_JSON = 'tarea.json';
class Tarea {
    constructor() {
        this._ID = "";
        this._titulo = "";
        this._descripcion = "";
        this._dificultad = 1;
        this._estado = "Pendiente";
        this._preguntaFecha = 2;
    }
    static fromObject(obj) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        const tarea = new Tarea();
        tarea.ID = (_b = (_a = obj.ID) !== null && _a !== void 0 ? _a : obj._ID) !== null && _b !== void 0 ? _b : "";
        tarea.titulo = (_d = (_c = obj.titulo) !== null && _c !== void 0 ? _c : obj._titulo) !== null && _d !== void 0 ? _d : "";
        tarea.descripcion = (_f = (_e = obj.descripcion) !== null && _e !== void 0 ? _e : obj._descripcion) !== null && _f !== void 0 ? _f : "";
        tarea.dificultad = typeof obj.dificultad === "number" ? obj.dificultad : (typeof obj._dificultad === "number" ? obj._dificultad : 1);
        tarea.estado = (_h = (_g = obj.estado) !== null && _g !== void 0 ? _g : obj._estado) !== null && _h !== void 0 ? _h : "Pendiente";
        tarea.preguntaFecha = typeof obj.preguntaFecha === "number" ? obj.preguntaFecha : (typeof obj._preguntaFecha === "number" ? obj._preguntaFecha : 2);
        tarea.dia = typeof obj.dia === "number" ? obj.dia : (typeof obj._dia === "number" ? obj._dia : undefined);
        tarea.mes = typeof obj.mes === "number" ? obj.mes : (typeof obj._mes === "number" ? obj._mes : undefined);
        tarea.anio = typeof obj.anio === "number" ? obj.anio : (typeof obj._anio === "number" ? obj._anio : undefined);
        return tarea;
    }
    toJSON() {
        return {
            ID: this.ID,
            titulo: this.titulo,
            descripcion: this.descripcion,
            dificultad: this.dificultad,
            estado: this.estado,
            preguntaFecha: this.preguntaFecha,
            dia: this.dia,
            mes: this.mes,
            anio: this.anio,
        };
    }
    get ID() {
        return this._ID;
    }
    set ID(value) {
        this._ID = value;
    }
    get titulo() {
        return this._titulo;
    }
    set titulo(value) {
        this._titulo = value;
    }
    get descripcion() {
        return this._descripcion;
    }
    set descripcion(value) {
        this._descripcion = value;
    }
    get dificultad() {
        return this._dificultad;
    }
    set dificultad(value) {
        this._dificultad = value;
    }
    get estado() {
        return this._estado;
    }
    set estado(value) {
        this._estado = value;
    }
    get preguntaFecha() {
        return this._preguntaFecha;
    }
    set preguntaFecha(value) {
        this._preguntaFecha = value;
    }
    get dia() {
        return this._dia;
    }
    set dia(value) {
        this._dia = value;
    }
    get mes() {
        return this._mes;
    }
    set mes(value) {
        this._mes = value;
    }
    get anio() {
        return this._anio;
    }
    set anio(value) {
        this._anio = value;
    }
}
exports.Tarea = Tarea;
exports.listaTareas = [];
exports.cantidadTareas = 0;
cargarDesdeArchivo();
function cargarDesdeArchivo() {
    try {
        if (fs_1.default.existsSync(ARCHIVO_JSON)) {
            const raw = fs_1.default.readFileSync(ARCHIVO_JSON, 'utf-8').trim();
            if (raw.length > 0) {
                const parsed = JSON.parse(raw);
                if (Array.isArray(parsed)) {
                    exports.listaTareas = parsed.map((item) => Tarea.fromObject(item));
                    exports.cantidadTareas = exports.listaTareas.length;
                }
            }
        }
    }
    catch (error) {
        console.error("Error al cargar el archivo de tareas:", error);
        exports.listaTareas = [];
        exports.cantidadTareas = 0;
    }
}
function crearTarea() {
    if (exports.cantidadTareas >= MAX_TAREAS) {
        console.log("No se pueden agregar más tareas.");
        return;
    }
    console.clear();
    console.log("Creando una nueva tarea...\n");
    let tarea = new Tarea();
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
        exports.listaTareas.push(tarea);
        exports.cantidadTareas++;
        guardarEnArchivo();
        console.log("\n¡Tarea guardada exitosamente!\n");
    }
    else {
        console.log("\nTarea cancelada.");
    }
}
function guardarEnArchivo() {
    try {
        const data = JSON.stringify(exports.listaTareas, null, 2); // Convierte el array a texto bonito
        fs_1.default.writeFileSync(ARCHIVO_JSON, data, 'utf-8');
    }
    catch (error) {
        console.error("Error al guardar el archivo:", error);
    }
}
function darID(t) {
    // Validar que el objeto no tenga ID previamente
    if (!t.ID || t.ID.trim() === "") {
        t.ID = (0, uuid_1.v4)().slice(0, 6);
    }
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
    console.log("ID: " + t.ID);
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
