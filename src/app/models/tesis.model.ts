import { Alumno } from "./alumno.model";

export class Tesis {

    idTesis?: number;
    titulo?: string;
    tema?: string;
    fechaCreacion?:Date ;
    fechaRegistro?:Date ;
    estado?: number;
    alumno?: Alumno;
}
