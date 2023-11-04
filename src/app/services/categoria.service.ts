import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../app.settings';
import { Categoria } from '../models/categoria.model';

const baseUrl =  AppSettings.API_ENDPOINT + "/util";

@Injectable({
  providedIn: 'root'
})

export class CategoriaService {
    constructor(private http: HttpClient) {}
  
    listarCategoria(): Observable<string[]> {
      return this.http.get<string[]>(baseUrl + '/listCategoria');
    }
    
  }