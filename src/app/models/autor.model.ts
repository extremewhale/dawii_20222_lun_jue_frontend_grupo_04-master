import { Grado } from "./grado.model";

export class Autor {

    idAutor?: number;
    nombres?: string;
    apellidos?: string;
    fechaNacimiento?:string|Date ;
    telefono?: string;
    fechaRegistro?:Date ;
    estado?: number;
    grado?: Grado;

}
