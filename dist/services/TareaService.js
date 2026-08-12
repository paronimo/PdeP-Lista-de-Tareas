"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TareaService = void 0;
class TareaService {
    constructor(repository, maxTasks = 100) {
        this.repository = repository;
        this.maxTasks = maxTasks;
        this.tasks = repository.load();
    }
    getAll() {
        return this.tasks;
    }
    getTaskCount() {
        return this.tasks.length;
    }
    canAddTask() {
        return this.tasks.length < this.maxTasks;
    }
    addTask(task) {
        if (!this.canAddTask()) {
            throw new Error("No se pueden agregar más tareas.");
        }
        this.tasks.push(task);
        this.save();
    }
    updateTask(updatedTask) {
        const index = this.tasks.findIndex((task) => task.id === updatedTask.id);
        if (index === -1) {
            return false;
        }
        this.tasks[index] = updatedTask;
        this.save();
        return true;
    }
    deleteTask(id) {
        const index = this.tasks.findIndex((task) => task.id === id);
        if (index === -1) {
            return false;
        }
        this.tasks.splice(index, 1);
        this.save();
        return true;
    }
    findById(id) {
        return this.tasks.find((task) => task.id === id);
    }
    filterByStatus(status) {
        return this.tasks.filter((task) => task.estado === status);
    }
    filterByDifficulty(dificultad) {
        return this.tasks.filter((task) => task.dificultad === dificultad);
    }
    save() {
        this.repository.save(this.tasks);
    }
}
exports.TareaService = TareaService;
