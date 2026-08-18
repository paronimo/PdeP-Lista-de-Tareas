"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.obtenerTextoDificultad = exports.mapearEstado = exports.setTitulo = exports.crearTareaVacia = void 0;
const crearTareaVacia = (id) => ({
    id,
    titulo: "",
    descripcion: "",
    dificultad: 1,
    estado: "Pendiente",
});
exports.crearTareaVacia = crearTareaVacia;
const setTitulo = (t, titulo) => (Object.assign(Object.assign({}, t), { titulo }));
exports.setTitulo = setTitulo;
const mapearEstado = (opt) => {
    switch (opt) {
        case 1:
            return "Pendiente";
        case 2:
            return "En curso";
        default:
            return "Terminada";
    }
};
exports.mapearEstado = mapearEstado;
const obtenerTextoDificultad = (d) => {
    const nombres = ["", "Facilísimo", "Fácil", "Medio", "Complicado", "Difícilísimo"];
    return nombres[Math.min(Math.max(d, 1), 5)];
};
exports.obtenerTextoDificultad = obtenerTextoDificultad;
