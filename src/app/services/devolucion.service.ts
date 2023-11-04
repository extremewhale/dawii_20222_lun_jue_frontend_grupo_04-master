import { Injectable } from '@angular/core';
import { AppSettings } from '../app.settings';

const baseUrlDevolucion = AppSettings.API_ENDPOINT+ '/devolucion';

@Injectable({
  providedIn: 'root'
})
export class DevolucionService {

  constructor() { }
}
