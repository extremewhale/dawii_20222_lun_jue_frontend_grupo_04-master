import { Categoria } from "./categoria.model";

export class Libro {
    idLibro?: number;
    titulo?: string;
    anio?: string;
    serie?:string;
    fechaRegistro?:string;
    estado?: number;
    categoria?: Categoria;
}
