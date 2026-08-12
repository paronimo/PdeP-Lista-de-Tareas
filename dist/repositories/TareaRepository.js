"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonTareaRepository = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const Tarea_1 = require("../models/Tarea");
class JsonTareaRepository {
    constructor(filePath) {
        this.filePath = path_1.default.resolve(process.cwd(), filePath !== null && filePath !== void 0 ? filePath : "tarea.json");
    }
    load() {
        try {
            if (!fs_1.default.existsSync(this.filePath)) {
                return [];
            }
            const raw = fs_1.default.readFileSync(this.filePath, "utf-8").trim();
            if (raw.length === 0) {
                return [];
            }
            const parsed = JSON.parse(raw);
            if (!Array.isArray(parsed)) {
                return [];
            }
            return parsed.map((item) => Tarea_1.Tarea.fromObject(item));
        }
        catch (error) {
            console.error("Error loading tasks from disk:", error);
            return [];
        }
    }
    save(tasks) {
        try {
            const data = JSON.stringify(tasks.map((task) => task.toJSON()), null, 2);
            fs_1.default.writeFileSync(this.filePath, data, "utf-8");
        }
        catch (error) {
            console.error("Error saving tasks to disk:", error);
        }
    }
}
exports.JsonTareaRepository = JsonTareaRepository;
