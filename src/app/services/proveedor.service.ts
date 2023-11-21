import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../app.settings';
import { Proveedor } from '../models/proveedor.model';

/*const baseUrlProveedor = "http://localhost:8090/rest"+ '/proveedor/';*/
const baseUrlProveedor = AppSettings.API_ENDPOINT+ '/proveedor';
const baseCrudUrl = "http://localhost:8090/rest/crudProveedor/"

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  constructor(private http:HttpClient) { }

  insertar1(data:Proveedor):Observable<any>{
    return this.http.post(baseUrlProveedor, data);
  }

  listaProveedor(razonsocial:string, ruc:string, estado:number, idPais:number):Observable<any>{

    const params = new HttpParams().set("razonsocial", razonsocial).set("ruc", ruc).set("estado", estado).set("idPais", idPais);
    return this.http.get(baseUrlProveedor + "/listaPorFiltro", {params});
  }
  
    //para el crud
    
    

  consultaProveedor(nombre :string): Observable<any>{
      return this.http.get(baseCrudUrl + "listaProveedorPorNombreLike/" + nombre)
  }

  registraProveedor(proveedor :Proveedor): Observable<any>{
      return this.http.post(baseCrudUrl + "registraProveedor", proveedor);
  }

  actualizaProveedor(proveedor :Proveedor): Observable<any>{
    return this.http.put(baseCrudUrl + "actualizaProveedor", proveedor);
  }

  eliminaProveedor(idProvedor : number): Observable<any>{
    return this.http.delete(baseCrudUrl + "eliminaProveedor/" + idProvedor);
  }

}
