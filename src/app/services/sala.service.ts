import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../app.settings';
import { Sala } from '../models/sala.model';

const baseUrlSala = AppSettings.API_ENDPOINT+ '/sala';

@Injectable({
  providedIn: 'root'
})

export class SalaService {

  constructor(private http:HttpClient) { }

  insertar(data:Sala):Observable<any>{
    return this.http.post(baseUrlSala, data);
  }

  listaSala(numero:string,recursos:string, idSede: number, estado : number): Observable<any>{
    const params = new HttpParams().set("numero", numero).set("recursos", recursos).set("idSede", idSede).set("estado", estado);  
    return this.http.get(baseUrlSala + "/listaSalaConParametros", {params});
  }
  consultaPorRecursos(recursos:string):Observable<any>{
    const params = new HttpParams().set("recurso", recursos);
    console.log("PARAMSSSS : " ,params);
    return  this.http.get(baseUrlSala +"/listaSalaPorRecursoLike", {params}); 
  }
  
  insertaSala(obj:Sala):Observable<any>{
    console.log("HOLAaaaaaa");
    console.log("SERVICES ::: " , obj);
    return this.http.post(baseUrlSala + "/registraSala", obj);
}
  actualiza(obj:Sala):Observable<any>{
    return this.http.put(baseUrlSala + "/actualizaSala", obj);
  }  
  elimina(idSala:number):Observable<any>{
      return this.http.delete(baseUrlSala + "/eliminaSala/"+ idSala);
  }
  
}
