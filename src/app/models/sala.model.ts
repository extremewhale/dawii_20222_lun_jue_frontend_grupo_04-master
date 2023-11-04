import { Sede } from "./sede.model";

export class Sala {

    idSala?: number;
    numero?: string;
    piso?: number;
    numAlumnos?:number;
    recursos?: string;
    fechaRegistro?:Date;
    estado?: number;
    sede?: Sede;

}
