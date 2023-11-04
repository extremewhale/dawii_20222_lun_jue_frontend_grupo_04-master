import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../app.settings';
import { Alumno } from '../models/alumno.model';


const baseUrlAlumno = AppSettings.API_ENDPOINT+ '/alumno';

@Injectable({
  providedIn: 'root'
})

export class AlumnoService {

  constructor(private http:HttpClient) { }

  inserta(data:Alumno):Observable<any>{
    return this.http.post(baseUrlAlumno, data);
  }

  listarAlumno(): Observable<string[]> {
    return this.http.get<string[]>(baseUrlAlumno + '/listaAlumnos');
  }

}
