import promptSync from "prompt-sync";
import { v4 as uuidv4 } from "uuid";
import { Tarea, FechaVencimiento } from "./types";
import { crearTareaVacia, setTitulo, mapearEstado, obtenerTextoDificultad } from "./tarea.pure";

const prompt = promptSync({ sigint: true });

export const capturarTareaPorConsola = (): Tarea => {
  console.clear();
  console.log("--- CREAR NUEVA TAREA ---\n");

  let tarea = crearTareaVacia(uuidv4().slice(0, 6));

  const titulo = prompt("Título de la tarea: ");
  tarea = setTitulo(tarea, titulo);

  const descripcion = prompt("Descripción: ");
  tarea = { ...tarea, descripcion };

  let dif = 1;
  do {
    console.log("\n1=§ (Facilisimo) | 2=§§ (Facil) | 3=§§§ (Medio) | 4=§§§§ (Complicado) | 5=§§§§§ (Dificilisimo)");
    dif = parseInt(prompt("Seleccione dificultad (1-5): "));
  } while (isNaN(dif) || dif < 1 || dif > 5);
  tarea = { ...tarea, dificultad: dif };

  let estOpt = 1;
  do {
    console.log("\n1 = Pendiente | 2 = En curso | 3 = Terminada");
    estOpt = parseInt(prompt("Seleccione el estado: "));
  } while (isNaN(estOpt) || estOpt < 1 || estOpt > 3);
  tarea = { ...tarea, estado: mapearEstado(estOpt) };

  const quiereVencimiento = prompt("¿Tiene fecha de vencimiento? SI(1) / NO(2): ") === "1";
  if (quiereVencimiento) {
    const dia = parseInt(prompt("Día: "));
    const mes = parseInt(prompt("Mes: "));
    const anio = parseInt(prompt("Año: "));
    if (dia > 0 && dia <= 31 && mes > 0 && mes <= 12 && anio >= 2025) {
      tarea = { ...tarea, vencimiento: { dia, mes, anio } };
    }
  }

  return tarea;
};

export const imprimirResumenTarea = (tarea: Tarea): void => {
  console.log("\n----------------------------------------");
  console.log(`ID: ${tarea.id}`);
  console.log(`Título: ${tarea.titulo}`);
  console.log(`Descripción: ${tarea.descripcion}`);
  console.log(`Dificultad: ${obtenerTextoDificultad(tarea.dificultad)}`);
  console.log(`Estado: ${tarea.estado}`);
  
  if (tarea.vencimiento) {
    const { dia, mes, anio } = tarea.vencimiento;
    console.log(`Vencimiento: ${dia}/${mes}/${anio}`);
  } else {
    console.log("Vencimiento: Sin fecha definida");
  }
  console.log("----------------------------------------\n");
};