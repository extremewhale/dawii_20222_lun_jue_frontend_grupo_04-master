import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './auth/login.component';
import { AgregarAlumnoComponent } from './components/agregar-alumno/agregar-alumno.component';
import { AgregarLibroComponent } from './components/agregar-libro/agregar-libro.component';
import { AgregarTesisComponent } from './components/agregar-tesis/agregar-tesis.component';
import { AgregarAutorComponent } from './components/agregar-autor/agregar-autor.component';
import { AgregarSalaComponent } from './components/agregar-sala/agregar-sala.component';
import { ConsultaAlumnoComponent } from './components/consulta-alumno/consulta-alumno.component';
import { ConsultaLibroComponent } from './components/consulta-libro/consulta-libro.component';
import { ConsultaTesisComponent } from './components/consulta-tesis/consulta-tesis.component';
import { ConsultaAutorComponent } from './components/consulta-autor/consulta-autor.component';
import { ConsultaSalaComponent } from './components/consulta-sala/consulta-sala.component';
import { CrudAlumnoComponent } from './components/crud-alumno/crud-alumno.component';
import { CrudLibroComponent } from './components/crud-libro/crud-libro.component';
import { CrudTesisComponent } from './components/crud-tesis/crud-tesis.component';
import { CrudAutorComponent } from './components/crud-autor/crud-autor.component';
import { CrudSalaComponent } from './components/crud-sala/crud-sala.component';
import { PrestamoComponent } from './components/prestamo/prestamo.component';
import { DevolucionComponent } from './components/devolucion/devolucion.component';
import { AgregarProveedorComponent } from './components/agregar-proveedor/agregar-proveedor.component';
import { ConsultaProveedorComponent } from './components/consulta-proveedor/consulta-proveedor.component';
import { CrudProveedorComponent } from './components/crud-proveedor/crud-proveedor.component';
import { AgregarPruebaComponent } from './components/agregar-prueba/agregar-prueba.component';
import { ProdInterceptorService } from './interceptors/prod-interceptor.service';
import { BuscarPipe } from './pipes/buscar.pipe';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent,
    IndexComponent,
    AgregarAlumnoComponent,
    AgregarLibroComponent,
    AgregarTesisComponent,
    AgregarAutorComponent,
    AgregarSalaComponent,
    ConsultaAlumnoComponent,
    ConsultaLibroComponent,
    ConsultaTesisComponent,
    ConsultaAutorComponent,
    ConsultaSalaComponent,
    CrudAlumnoComponent,
    CrudLibroComponent,
    CrudTesisComponent,
    CrudAutorComponent,
    CrudSalaComponent,
    PrestamoComponent,
    DevolucionComponent,
    AgregarProveedorComponent,
    ConsultaProveedorComponent,
    CrudProveedorComponent,
    AgregarPruebaComponent,
    BuscarPipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    AppRoutingModule

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ProdInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
