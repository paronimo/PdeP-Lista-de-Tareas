export class Tarea {
    private _ID: string;
    private _titulo: string;
    private _descripcion: string;
    private _dificultad: number;
    private _estado: string;
    private _preguntaFecha: number;
    private _dia?: number;
    private _mes?: number;
    private _anio?: number;

    constructor() {
        this._ID = "";
        this._titulo = "";
        this._descripcion = "";
        this._dificultad = 1;
        this._estado = "Pendiente";
        this._preguntaFecha = 2;
    }

    get ID(): string {
        return this._ID;
    }

    set ID(value: string) {
        this._ID = value;
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

    get estado(): string {
        return this._estado;
    }

    set estado(value: string) {
        this._estado = value;
    }

    get preguntaFecha(): number {
        return this._preguntaFecha;
    }

    set preguntaFecha(value: number) {
        this._preguntaFecha = value;
    }

    get dia(): number | undefined {
        return this._dia;
    }

    set dia(value: number | undefined) {
        this._dia = value;
    }

    get mes(): number | undefined {
        return this._mes;
    }

    set mes(value: number | undefined) {
        this._mes = value;
    }

    get anio(): number | undefined {
        return this._anio;
    }

    set anio(value: number | undefined) {
        this._anio = value;
    }
}