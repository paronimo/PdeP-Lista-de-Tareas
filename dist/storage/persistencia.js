"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cargarTareasJSON = exports.guardarTareasJSON = void 0;
const fs_1 = __importDefault(require("fs"));
const guardarTareasJSON = (ruta, tareas) => {
    try {
        fs_1.default.writeFileSync(ruta, JSON.stringify(tareas, null, 2), "utf-8");
        return true;
    }
    catch (error) {
        console.error("Error al guardar tareas:", error);
        return false;
    }
};
exports.guardarTareasJSON = guardarTareasJSON;
/*export function guardarEnArchivo(): void {
    try {
        const data = JSON.stringify(listaTareas, null, 2); // Convierte el array a texto bonito
        fs.writeFileSync(ARCHIVO_JSON, data, 'utf-8');
    } catch (error) {
        console.error("Error al guardar el archivo:", error);
    }
}*/
const cargarTareasJSON = (ruta) => {
    try {
        if (!fs_1.default.existsSync(ruta))
            return [];
        const raw = fs_1.default.readFileSync(ruta, "utf-8").trim();
        return raw ? JSON.parse(raw) : [];
    }
    catch (error) {
        console.error("Error al cargar tareas:", error);
        return [];
    }
};
exports.cargarTareasJSON = cargarTareasJSON;
