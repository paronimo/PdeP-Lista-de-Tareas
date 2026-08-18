"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tarea = void 0;
class Tarea {
    constructor() {
        this._ID = "";
        this._titulo = "";
        this._descripcion = "";
        this._dificultad = 1;
        this._estado = "Pendiente";
        this._preguntaFecha = 2;
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
