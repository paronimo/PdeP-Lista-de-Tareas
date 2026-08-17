import { Tarea, TaskStatus } from "../models/Tarea";
import { TareaRepository } from "../repositories/TareaRepository";

export class TareaService {
  private tasks: Tarea[];
  private readonly maxTasks: number;

  //explicacion: El constructor de la clase TareaService recibe un objeto que implementa la interfaz TareaRepository y 
  // un número máximo de tareas (maxTasks) como parámetros. Inicializa la propiedad repository con el repositorio
  //  proporcionado, establece el límite máximo de tareas y carga las tareas existentes desde el repositorio llamando al 
  // método load(). Esto permite que la clase TareaService gestione las tareas utilizando el almacenamiento definido por
  //  el repositorio.
  constructor(repository: TareaRepository, maxTasks = 100) {
    this.repository = repository;
    this.maxTasks = maxTasks;
    this.tasks = repository.load();
  }

  private readonly repository: TareaRepository;

  getAll(): Tarea[] {
    return this.tasks;
  }

  getTaskCount(): number {
    return this.tasks.length;
  }

  canAddTask(): boolean {
    return this.tasks.length < this.maxTasks;
  }

  addTask(task: Tarea): void {
    if (!this.canAddTask()) {
      throw new Error("No se pueden agregar más tareas.");
    }

    this.tasks.push(task);
    this.save();
  }

  updateTask(updatedTask: Tarea): boolean {
    const index = this.tasks.findIndex((task) => task.id === updatedTask.id);
    if (index === -1) {
      return false;
    }

    this.tasks[index] = updatedTask;
    this.save();
    return true;
  }

  deleteTask(id: string): boolean {
    const index = this.tasks.findIndex((task) => task.id === id);
    if (index === -1) {
      return false;
    }
/* explicacion de la funcion deleteTask: Esta función busca una tarea por su ID en la lista de tareas.
Si encuentra la tarea, la elimina de la lista y llama a la función save() para persistir los cambios en el repositorio.
Si no encuentra la tarea, devuelve false.*/
    this.tasks.splice(index, 1);
    this.save();
    return true;
  }

  findById(id: string): Tarea | undefined {
    return this.tasks.find((task) => task.id === id);
  }
  filterByStatus(status: TaskStatus): Tarea[] {
    return this.tasks.filter((task) => task.estado === status);
  }

  filterByDifficulty(dificultad: number): Tarea[] {
    return this.tasks.filter((task) => task.dificultad === dificultad);
  }
//explicacion de la funcion save: Esta función se encarga de guardar el estado actual de la lista de tareas en el repositorio. Llama al método save del repositorio, pasando la lista de tareas como argumento. Esto asegura que cualquier cambio realizado en la lista de tareas (como agregar, actualizar o eliminar tareas) se persista en el almacenamiento subyacente definido por el repositorio.
  save(): void {
    this.repository.save(this.tasks);
  }
}
