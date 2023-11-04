import { HttpClient , HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../app.settings';
import { Libro } from '../models/libro.model';

const baseUrlLibro = AppSettings.API_ENDPOINT;

@Injectable({
  providedIn: 'root'
})
export class LibroService {

  constructor(private http:HttpClient) { }

  registrarCrud(data:Libro):Observable<any>{
    return this.http.post(baseUrlLibro+ "/crud/libro/registraLibro", data);
  }

  registrar(data:Libro):Observable<any>{
    return this.http.post(baseUrlLibro+ "/libro/insert", data);
  }

  listaLibro(titulo:string, serie:string, idCategoria: number, estado : number, fecIni:string, fecFin:string): Observable<any>{
    const params = new HttpParams().set("titulo", titulo).set("serie", serie).set("idCategoria", idCategoria).set("estado", estado).set("fechaInicio", fecIni).set("fechaFin", fecFin);  
    return this.http.get(baseUrlLibro + "/libro/listaLibroConParametros", {params});
  }

  consultaPorNombre(filtro:string):Observable<Libro[]>{
    return  this.http.get<Libro[]>(baseUrlLibro +"/crud/libro/listaLibroPorTitulo/"+filtro); 
}

listaLibroTotal():Observable<Libro[]>{
  return  this.http.get<Libro[]>(baseUrlLibro +"/listaLibro"); 
} 

actualiza(obj:Libro):Observable<any>{
    return this.http.put(baseUrlLibro + "/crud/libro/actualizaLibro", obj);
}

elimina(idLibro:number):Observable<any>{
    return this.http.delete(baseUrlLibro + "/crud/libro/eliminaLibro/"+ idLibro);
}
}
