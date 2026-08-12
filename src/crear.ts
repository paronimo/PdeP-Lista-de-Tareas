/// <reference types="node" />
import promptSync from "prompt-sync";
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import { Tarea } from './models/Tarea';
const prompt = promptSync({ sigint: true });
const MAX_TAREAS: number = 100;
const ARCHIVO_JSON = 'tarea.json';



    toJSON(): object {
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

   

export let listaTareas: Tarea[] = [];
export let cantidadTareas: number = 0;

cargarDesdeArchivo();

export function cargarDesdeArchivo(): void {
    try {
        if (fs.existsSync(ARCHIVO_JSON)) {
            const raw = fs.readFileSync(ARCHIVO_JSON, 'utf-8').trim();
            if (raw.length > 0) {
                const parsed = JSON.parse(raw);
                if (Array.isArray(parsed)) {
                    listaTareas = parsed.map((item: any) => Tarea.fromObject(item));
                    cantidadTareas = listaTareas.length;
                }
            }
        }
    } catch (error) {
        console.error("Error al cargar el archivo de tareas:", error);
        listaTareas = [];
        cantidadTareas = 0;
    }
}

export function crearTarea(): void {
    if (cantidadTareas >= MAX_TAREAS) {
    console.log("No se pueden agregar más tareas.");
    return;
    }

    console.clear();
    console.log("Creando una nueva tarea...\n");

    let tarea: Tarea = new Tarea();

darID(tarea);
pedirTitulo(tarea);
pedirDescripcion(tarea);
pedirDificultad(tarea);pedirEstado(tarea);
pedirFechaVencimiento(tarea);

console.clear();
mostrarResumen(tarea);

    const confirm = parseInt(prompt("¿Confirmar tarea? SI(1) / NO(2): "));
    if (confirm === 1) {
    listaTareas.push(tarea);
    cantidadTareas++;
    guardarEnArchivo();
    console.log("\n¡Tarea guardada exitosamente!\n");
    } else {
    console.log("\nTarea cancelada.");
    }
}
export function guardarEnArchivo(): void {
    try {
        const data = JSON.stringify(listaTareas, null, 2); // Convierte el array a texto bonito
        fs.writeFileSync(ARCHIVO_JSON, data, 'utf-8');
    } catch (error) {
        console.error("Error al guardar el archivo:", error);
    }
}

export function darID(t: Tarea): void {
    // Validar que el objeto no tenga ID previamente
    if (!t.ID || t.ID.trim() === "") {
        t.ID = uuidv4().slice(0, 6);
    }
}
export function pedirTitulo(t: Tarea): void {
    t.titulo = prompt("Título de la tarea: ");
}

export function pedirDescripcion(t: Tarea): void {
    t.descripcion = prompt("Descripción: ");
}

export function pedirDificultad(t: Tarea): void {
    do {
    console.log("\n1 = § = Facilisimo\n2 = §§ = Facil\n3 = §§§ = Medio\n4 = §§§§ = Complicado\n5 = §§§§§ = Dificilisimo");
    t.dificultad = parseInt(prompt("Seleccione su dificultad (1-5): "));
    } while (t.dificultad < 1 || t.dificultad > 5);
}

export function pedirEstado(t: Tarea): void {
    let opcion: number;
    do {
    console.log("\n1 = Pendiente\n2 = En curso\n3 = Terminada");
    opcion = parseInt(prompt("Seleccione el estado: "));
} while (opcion < 1 || opcion > 3);

    switch (opcion) {
    case 1: t.estado = "Pendiente"; break;
    case 2: t.estado = "En curso"; break;
    case 3: t.estado = "Terminada"; break;
    }
}

export function pedirFechaVencimiento(t: Tarea): void {
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
export function mostrarResumen(t: Tarea): void {
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
    } else {
    console.log("Vencimiento: Sin fecha definida");
    }
    console.log("----------------------------------------\n");
}
