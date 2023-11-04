import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../app.settings';
import { Autor } from '../models/autor.model';

const baseUrlAutor = AppSettings.API_ENDPOINT+ '/autor';

@Injectable({
  providedIn: 'root'
})

export class AutorService {

  constructor(private http:HttpClient) { }

  insertar(data:Autor):Observable<any>{
    return this.http.post(baseUrlAutor, data);
  }


  agregar(data:Autor):Observable<any>{
    return this.http.post(baseUrlAutor + "/registraAutor", data);
  }

  actualizar(data:Autor):Observable<any>{
    return this.http.put(baseUrlAutor + "/actualizarAutor", data);
  }

  eliminar(idAutor:number):Observable<any>{
    return this.http.delete(baseUrlAutor + "/eliminaAutor/" + idAutor);
  }

  listaConFiltro(nombres:string, apellidos:string, telefono:string, idGrado: number, estado : number): Observable<any>{
    const params = new HttpParams().set("nombres", nombres).set("apellidos", apellidos).set("telefono", telefono).set("idGrado", idGrado).set("estado", estado);  
    return this.http.get(baseUrlAutor + "/listaAutorConFiltro", {params});
  }

  listarCrudConFiltro(nombres:string, apellidos:string): Observable<any>{
    const params = new HttpParams().set("nombres", nombres).set("apellidos", apellidos);  
    return this.http.get(baseUrlAutor + "/listaAutorPorNombresApellidosLike", {params});
  }


}
