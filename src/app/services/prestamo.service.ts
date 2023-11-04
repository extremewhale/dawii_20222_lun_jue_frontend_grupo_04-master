import { Injectable } from '@angular/core';
import { AppSettings } from '../app.settings';

const baseUrlPrestamo = AppSettings.API_ENDPOINT+ '/prestamo';

@Injectable({
  providedIn: 'root'
})
export class PrestamoService {

  constructor() { }
}
