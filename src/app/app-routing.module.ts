import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login.component';
import { IndexComponent } from './index/index.component';
import { AgregarAlumnoComponent } from './components/agregar-alumno/agregar-alumno.component';
import { AgregarLibroComponent } from './components/agregar-libro/agregar-libro.component';
import { AgregarTesisComponent } from './components/agregar-tesis/agregar-tesis.component';
import { AgregarAutorComponent } from './components/agregar-autor/agregar-autor.component';
import { AgregarSalaComponent } from './components/agregar-sala/agregar-sala.component';
import { AgregarProveedorComponent } from './components/agregar-proveedor/agregar-proveedor.component';
import { ConsultaAlumnoComponent } from './components/consulta-alumno/consulta-alumno.component';
import { ConsultaLibroComponent } from './components/consulta-libro/consulta-libro.component';
import { ConsultaTesisComponent } from './components/consulta-tesis/consulta-tesis.component';
import { ConsultaAutorComponent } from './components/consulta-autor/consulta-autor.component';
import { ConsultaSalaComponent } from './components/consulta-sala/consulta-sala.component';
import { ConsultaProveedorComponent } from './components/consulta-proveedor/consulta-proveedor.component';
import { CrudAlumnoComponent } from './components/crud-alumno/crud-alumno.component';
import { CrudLibroComponent } from './components/crud-libro/crud-libro.component';
import { CrudTesisComponent } from './components/crud-tesis/crud-tesis.component';
import { CrudAutorComponent } from './components/crud-autor/crud-autor.component';
import { CrudSalaComponent } from './components/crud-sala/crud-sala.component';
import { CrudProveedorComponent } from './components/crud-proveedor/crud-proveedor.component';
import { PrestamoComponent } from './components/prestamo/prestamo.component';
import { AgregarPruebaComponent } from './components/agregar-prueba/agregar-prueba.component';
import { DevolucionComponent } from './components/devolucion/devolucion.component';



const routes: Routes = [
  {path:"agregarAlumno", component:AgregarAlumnoComponent },
  {path:"agregarLibro", component:AgregarLibroComponent },
  {path:"agregarTesis", component:AgregarTesisComponent },
  {path:"agregarAutor", component:AgregarAutorComponent },
  {path:"agregarSala", component:AgregarSalaComponent },
  {path:"agregarProveedor", component:AgregarProveedorComponent },
  {path:"agregarPrueba", component:AgregarPruebaComponent },
  {path:"consultaAlumno", component:ConsultaAlumnoComponent },
  {path:"consultaLibro", component:ConsultaLibroComponent },
  {path:"consultaTesis", component:ConsultaTesisComponent },
  {path:"consultaAutor", component:ConsultaAutorComponent },
  {path:"consultaSala", component:ConsultaSalaComponent },
  {path:"consultaProveedor", component:ConsultaProveedorComponent },
  {path:"crudAlumno", component:CrudAlumnoComponent },
  {path:"crudLibro", component:CrudLibroComponent },
  {path:"crudTesis", component:CrudTesisComponent },
  {path:"crudAutor", component:CrudAutorComponent },
  {path:"crudSala", component:CrudSalaComponent },
  {path:"crudProveedor", component:CrudProveedorComponent },
  {path:"prestamo", component:PrestamoComponent },
  {path:"devolucion", component:DevolucionComponent },
  { path: '', component: IndexComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {


}
