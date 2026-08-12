"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tarea = void 0;
class Tarea {
    constructor(props) {
        var _a, _b, _c, _d;
        this._id = (_a = props.id) !== null && _a !== void 0 ? _a : "";
        this._titulo = props.titulo;
        this._descripcion = props.descripcion;
        this._dificultad = props.dificultad;
        this._estado = (_b = props.estado) !== null && _b !== void 0 ? _b : "Pendiente";
        this._createdAt = (_c = props.createdAt) !== null && _c !== void 0 ? _c : new Date();
        this._dueDate = (_d = props.dueDate) !== null && _d !== void 0 ? _d : null;
    }
    static fromObject(obj) {
        var _a, _b, _c, _d, _e, _f;
        const createdAt = obj.createdAt ? new Date(obj.createdAt) : new Date();
        const dueDate = obj.dueDate ? new Date(obj.dueDate) : null;
        const estado = obj.estado === "Pendiente" || obj.estado === "En curso" || obj.estado === "Terminada"
            ? obj.estado
            : obj._estado === "Pendiente" || obj._estado === "En curso" || obj._estado === "Terminada"
                ? obj._estado
                : "Pendiente";
        return new Tarea({
            id: (_b = (_a = obj.id) !== null && _a !== void 0 ? _a : obj.ID) !== null && _b !== void 0 ? _b : "",
            titulo: (_d = (_c = obj.titulo) !== null && _c !== void 0 ? _c : obj._titulo) !== null && _d !== void 0 ? _d : "",
            descripcion: (_f = (_e = obj.descripcion) !== null && _e !== void 0 ? _e : obj._descripcion) !== null && _f !== void 0 ? _f : "",
            dificultad: typeof obj.dificultad === "number"
                ? obj.dificultad
                : typeof obj._dificultad === "number"
                    ? obj._dificultad
                    : 1,
            estado,
            createdAt,
            dueDate,
        });
    }
    toJSON() {
        return {
            id: this.id,
            titulo: this.titulo,
            descripcion: this.descripcion,
            dificultad: this.dificultad,
            estado: this.estado,
            createdAt: this.createdAt.toISOString(),
            dueDate: this.dueDate ? this.dueDate.toISOString() : null,
        };
    }
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
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
    get createdAt() {
        return this._createdAt;
    }
    set createdAt(value) {
        this._createdAt = value;
    }
    get dueDate() {
        return this._dueDate;
    }
    set dueDate(value) {
        this._dueDate = value;
    }
}
exports.Tarea = Tarea;
