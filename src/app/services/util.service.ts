import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../app.settings';
import { Alumno } from '../models/alumno.model';
import { Categoria } from '../models/categoria.model';
import { Grado } from '../models/grado.model';
import { Modalidad } from '../models/modalidad.model';
import { Pais } from '../models/pais.model';
import { Sede } from '../models/sede.model';

const baseUrlUtil = AppSettings.API_ENDPOINT+ '/util';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(private http:HttpClient) { }

  listaPais():Observable<Pais[]>{
    return this.http.get<Pais[]>(baseUrlUtil+"/listaPais");
  }

  listaCategoria():Observable<Categoria[]>{
    return this.http.get<Categoria[]>(baseUrlUtil+"/listaCategoria");
  }

  listaGrado():Observable<Grado[]>{
    return this.http.get<Grado[]>(baseUrlUtil+"/listaGrado");
  }

  listaModalidad():Observable<Modalidad[]>{
    return this.http.get<Grado[]>(baseUrlUtil+"/listaModalidad");
  }

  listaSede():Observable<Sede[]>{
    return this.http.get<Sede[]>(baseUrlUtil+"/listaSede");
  }

  listaAlumno():Observable<Alumno[]>{
    return this.http.get<Alumno[]>(baseUrlUtil+"/listaAlumno");
  }
}


