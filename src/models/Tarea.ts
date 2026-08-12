export type TaskStatus = "Pendiente" | "En curso" | "Terminada";

export interface TareaProps {
  id?: string;
  titulo: string;
  descripcion: string;
  dificultad: number;
  estado?: TaskStatus;
  createdAt?: Date;
  dueDate?: Date | null;
}

export class Tarea {
  private _id: string;
  private _titulo: string;
  private _descripcion: string;
  private _dificultad: number;
  private _estado: TaskStatus;
  private _createdAt: Date;
  private _dueDate: Date | null;

  constructor(props: TareaProps) {
    this._id = props.id ?? "";
    this._titulo = props.titulo;
    this._descripcion = props.descripcion;
    this._dificultad = props.dificultad;
    this._estado = props.estado ?? "Pendiente";
    this._createdAt = props.createdAt ?? new Date();
    this._dueDate = props.dueDate ?? null;
  }

  static fromObject(obj: any): Tarea {
    const createdAt = obj.createdAt ? new Date(obj.createdAt) : new Date();
    const dueDate = obj.dueDate ? new Date(obj.dueDate) : null;

    const estado =
      obj.estado === "Pendiente" || obj.estado === "En curso" || obj.estado === "Terminada"
        ? obj.estado
        : obj._estado === "Pendiente" || obj._estado === "En curso" || obj._estado === "Terminada"
        ? obj._estado
        : "Pendiente";

    return new Tarea({
      id: obj.id ?? obj.ID ?? "",
      titulo: obj.titulo ?? obj._titulo ?? "",
      descripcion: obj.descripcion ?? obj._descripcion ?? "",
      dificultad:
        typeof obj.dificultad === "number"
          ? obj.dificultad
          : typeof obj._dificultad === "number"
          ? obj._dificultad
          : 1,
      estado,
      createdAt,
      dueDate,
    });
  }

  toJSON(): object {
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

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get titulo(): string {
    return this._titulo;
  }

  set titulo(value: string) {
    this._titulo = value;
  }

  get descripcion(): string {
    return this._descripcion;
  }

  set descripcion(value: string) {
    this._descripcion = value;
  }

  get dificultad(): number {
    return this._dificultad;
  }

  set dificultad(value: number) {
    this._dificultad = value;
  }

  get estado(): TaskStatus {
    return this._estado;
  }

  set estado(value: TaskStatus) {
    this._estado = value;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  set createdAt(value: Date) {
    this._createdAt = value;
  }

  get dueDate(): Date | null {
    return this._dueDate;
  }

  set dueDate(value: Date | null) {
    this._dueDate = value;
  }
}
