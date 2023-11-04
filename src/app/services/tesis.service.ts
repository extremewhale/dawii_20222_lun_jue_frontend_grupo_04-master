import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../app.settings';
import { Tesis } from '../models/tesis.model';

const baseUrlTesis = AppSettings.API_ENDPOINT+ '/tesis';

@Injectable({
  providedIn: 'root'
})
export class TesisService {

  constructor(private http:HttpClient) { }

  inserta(data:Tesis):Observable<any>{
    return this.http.post(baseUrlTesis, data);
  }

  listaTesis(titulo:string, tema:string, idAlumno: number, estado : number): Observable<any>{
    const params = new HttpParams().set("titulo", titulo).set("tema", tema).set("idAlumno", idAlumno).set("estado", estado);  
    return this.http.get(baseUrlTesis + "/listaTesisConParametros", {params});
  }

  consultaPorTitulo(titulo:string):Observable<any>{
    const params = new HttpParams().set("titulo", titulo);
    return  this.http.get(baseUrlTesis +"/listaTesisPorTituloLike", {params}); 
  }  

  insertaTesis(obj:Tesis):Observable<any>{
      return this.http.post(baseUrlTesis+"/registraTesis", obj);
  }

  actualiza(obj:Tesis):Observable<any>{
      return this.http.put(baseUrlTesis + "/actualizaTesis", obj);
  }

  elimina(idTesis:number):Observable<any>{
      return this.http.delete(baseUrlTesis + "/eliminaTesis/"+ idTesis);
  }


}
