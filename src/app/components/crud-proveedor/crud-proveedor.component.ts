import { Component, OnInit } from '@angular/core';
import { Proveedor } from 'src/app/models/proveedor.model';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { catchError, finalize, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { UtilService } from 'src/app/services/util.service';
import { Pais } from 'src/app/models/pais.model';


@Component({
  selector: 'app-crud-proveedor',
  templateUrl: './crud-proveedor.component.html',
  styleUrls: ['./crud-proveedor.component.css']
})
export class CrudProveedorComponent implements OnInit {

  listaProveedores: Proveedor[] = [];
  searchText: string = '';
  isLoading: boolean = false;
  listPais: Pais[] = [];

  proveedor: Proveedor = {
    idProveedor: 0,
    razonsocial: '',
    ruc: '',
    direccion: '',
    celular: '',
    contacto: '',
    estado: 1,
    fechaRegistro: new Date(2022, 3, 4, 3, 59, 7),
    pais: {
      idPais: 2,
      iso: 'AX',
      nombre: 'Islas Gland',
    }
  };

  

  constructor(private proveedorService: ProveedorService, private utilService:UtilService) { 
    this.utilService.listaPais().subscribe(
      x => this.listPais = x
    );
  }

  ngOnInit(): void {
    this.consultar();
  }

  busca(obj:Proveedor){
    this.proveedor = obj
  }

  consultar(): void {
    this.isLoading = true;
    if(this.searchText === "") {
      this.searchText = "todos";
    }
    this.proveedorService.consultaProveedor(this.searchText)
      .pipe(
        tap(result => {
          this.listaProveedores = result;
          Swal.fire('Mensaje', 'Consulta realizada correctamente', 'info');
        }),
        catchError(error => {
          console.error('Error al consultar proveedores', error);
          Swal.fire('Error', 'Hubo un problema al consultar proveedores', 'error');
          return throwError(error);
        }),
        finalize(() => this.isLoading = false)
      )
      .subscribe();
      this.searchText = ""
  }

  limpiarFiltro(): void {
    this.searchText = '';
    this.consultar();
  }

  agregar(): void {
    this.proveedorService.registraProveedor(this.proveedor)
      .pipe(
        tap(result => {
          Swal.fire('Mensaje', result.mensaje, 'info');
          this.consultar();
        }),
        catchError(error => {
          console.error('Error al agregar proveedor', error);
          Swal.fire('Error', 'Hubo un problema al agregar proveedor', 'error');
          return throwError(error);
        })
      )
      .subscribe();
      this.proveedor= {
        idProveedor: 0,
        razonsocial: '',
        ruc: '',
        direccion: '',
        celular: '',
        contacto: '',
        estado: 1,
        fechaRegistro: undefined,
        pais: {
          idPais: 2,
          iso: 'AX',
          nombre: 'Islas Gland',
        }
      };
  }

  actualizar(proveedor: Proveedor): void {
    this.proveedorService.actualizaProveedor(proveedor)
      .pipe(
        tap(result => {
          Swal.fire('Mensaje', result.mensaje, 'info');
          this.consultar();
        }),
        catchError(error => {
          console.error('Error al actualizar proveedor', error);
          Swal.fire('Error', 'Hubo un problema al actualizar proveedor', 'error');
          return throwError(error);
        })
      )
      .subscribe();
      this.proveedor= {
        idProveedor: 0,
        razonsocial: '',
        ruc: '',
        direccion: '',
        celular: '',
        contacto: '',
        estado: 1,
        fechaRegistro: undefined,
        pais: {
          idPais: 2,
          iso: 'AX',
          nombre: 'Islas Gland',
        }
      };
  }

  eliminar(proveedor: Proveedor): void {
    const idProveedor = proveedor.idProveedor;
  
    if (idProveedor !== undefined) {
      Swal.fire({
        title: '¿Desea eliminar?',
        text: 'Los cambios no se van a revertir',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, elimina.',
        cancelButtonText: 'No, cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.proveedorService.eliminaProveedor(idProveedor).subscribe(
            (result) => {
              Swal.fire('Mensaje', result.mensaje, 'success');
              this.consultar();
            },
            (error) => {
              console.error('Error al eliminar proveedor', error);
              Swal.fire('Error', 'Hubo un problema al eliminar proveedor', 'error');
            }
          );
        }
      });
    } else {
      console.error('Error: El ID del proveedor es undefined');
    }
    this.proveedor= {
      idProveedor: 0,
      razonsocial: '',
      ruc: '',
      direccion: '',
      celular: '',
      contacto: '',
      estado: 1,
      fechaRegistro: undefined,
      pais: {
        idPais: 2,
        iso: 'AX',
        nombre: 'Islas Gland',
      }
    };
  }
  
}