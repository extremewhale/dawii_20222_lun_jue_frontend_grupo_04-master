import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../app.settings';
import { Prueba } from '../models/prueba.model';

const baseUrlPrueba = AppSettings.API_ENDPOINT+ '/prueba';

@Injectable({
  providedIn: 'root'
})
export class PruebaService {

  constructor(private http:HttpClient) { }

  registrar(data:Prueba):Observable<any>{
    return this.http.post(baseUrlPrueba, data);
  }

}
