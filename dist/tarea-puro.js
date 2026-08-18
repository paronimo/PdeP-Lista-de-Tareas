"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.obtenerTextoDificultad = exports.mapearEstado = exports.setTitulo = exports.agregarTarea = exports.crearTareaVacia = void 0;
/** Crea un objeto Tarea con valores por defecto (Pura) */
const crearTareaVacia = (id) => ({
    id,
    titulo: "",
    descripcion: "",
    dificultad: 1,
    estado: "Pendiente"
});
exports.crearTareaVacia = crearTareaVacia;
/** Retorna una nueva lista con la tarea agregada si no supera el límite (Pura) */
const agregarTarea = (lista, nuevaTarea, maximo = 100) => {
    if (lista.length >= maximo)
        return lista;
    return [...lista, nuevaTarea];
};
exports.agregarTarea = agregarTarea;
/** Retorna una nueva tarea con el título asignado (Pura) */
const setTitulo = (tarea, titulo) => (Object.assign(Object.assign({}, tarea), { titulo: titulo.trim() }));
exports.setTitulo = setTitulo;
/** Mapea el número ingresado a un estado válido (Pura) */
const mapearEstado = (opcion) => {
    var _a;
    const estados = {
        1: "Pendiente",
        2: "En curso",
        3: "Terminada"
    };
    return (_a = estados[opcion]) !== null && _a !== void 0 ? _a : "Pendiente";
};
exports.mapearEstado = mapearEstado;
/** Retorna la representación visual formateada de la dificultad (Pura) */
const obtenerTextoDificultad = (dificultad) => {
    const opciones = ["Facilisimo", "Facil", "Medio", "Complicado", "Dificilisimo"];
    const index = Math.max(1, Math.min(dificultad, 5)) - 1;
    return `${"§".repeat(index + 1)} (${opciones[index]})`;
};
exports.obtenerTextoDificultad = obtenerTextoDificultad;
