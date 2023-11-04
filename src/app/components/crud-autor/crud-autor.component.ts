import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Autor } from 'src/app/models/autor.model';
import { Grado } from 'src/app/models/grado.model';
import { AutorService } from 'src/app/services/autor.service';
import { UtilService } from 'src/app/services/util.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crud-autor',
  templateUrl: './crud-autor.component.html',
  styleUrls: ['./crud-autor.component.css'],
})
export class CrudAutorComponent implements OnInit {

  searchText: string = '';
  
  //Ng Model
  nombres: string = '';
  apellidos: string = '';
  telefono: string = '';
  cboGrados: number = -1;
  estado: number = 1;

  //Grilla
  autores: string[] = [];

  //Listas
  listaGrados: Grado[] = [];
  listaAutores: Autor[] = [];

  //Json para registrar o actualizar
  autor: Autor = {
    idAutor: 0,
    nombres: '',
    apellidos: '',
    fechaNacimiento: '',
    telefono: '',
    grado: {
      idGrado: -1,
    },
  };

  grado?: Grado;

  //para verificar que se pulsó el boton
  submitted = false;

  formAgregar = new FormGroup({
    validarNombres: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100),
    ]),
    validarApellidos: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100),
    ]),
    validarTelefono: new FormControl('', [
      Validators.required,
      Validators.pattern('[0-9]{9}'),
    ]),
    validarGrado: new FormControl('', [Validators.required, Validators.min(1)]),
    validarFecha: new FormControl('', [
      Validators.required,
    ]),
  });


  formActualizar = new FormGroup({
    validarNombres: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100),
    ]),
    validarApellidos: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100),
    ]),
    validarTelefono: new FormControl('', [
      Validators.required,
      Validators.pattern('[0-9]{9}'),
    ]),
    validarGrado: new FormControl('', [Validators.required, Validators.min(1)]),
    validarFecha: new FormControl('', [
      Validators.required,
    ]),
    validarEstado: new FormControl('', [Validators.min(0)]),
  });

  constructor(
    private utilService: UtilService,
    private autorService: AutorService
  ) {
    this.utilService.listaGrado().subscribe((x) => {
      this.listaGrados = x;
    });
  }

  ngOnInit(): void {}

  consultar() {
    this.autorService
      .listarCrudConFiltro(this.nombres, this.apellidos)
      .subscribe((x) => {
        this.listaAutores = x.lista;
        Swal.fire({
          icon: 'info',
          title: 'Consulta exitosa',
          text: x.mensaje,
        });
      });
  }

  agregar() {
    this.submitted = true;
    //finaliza el método si hay un error
    if (this.formAgregar.invalid) {
      return;
    }
    this.submitted = false;
    document.getElementById('btnCerrarModalAgregar')?.click();
    this.autorService.agregar(this.autor).subscribe((x) => {
      Swal.fire('Mensaje', x.mensaje, 'info');
      this.autorService
        .listarCrudConFiltro(this.nombres, this.apellidos)
        .subscribe((x) => {
          this.listaAutores = x.lista;
        });
    });
    this.limpiarNgModel();
  }

  buscar(obj: Autor) {
    this.autor = obj;
  }

  actualizar() {
    this.submitted = true;
    //finaliza el método si hay un error
    if (this.formActualizar.invalid) {
      return;
    }
    this.submitted = false;
    document.getElementById('btnCerrarModalActualizar')?.click();
    this.autorService.actualizar(this.autor).subscribe((x) => {
      Swal.fire('Mensaje', x.mensaje, 'info');
      this.autorService
        .listarCrudConFiltro(this.nombres, this.apellidos)
        .subscribe((x) => {
          this.listaAutores = x.lista;
        });
    });
    this.limpiarNgModel();
  }

  eliminar(obj: Autor) {
    Swal.fire({
      title: '¿Desea eliminar?',
      text: 'Los cambios no se van a revertir',
      icon: 'warning',
      buttonsStyling: false,
      customClass: {
        confirmButton: 'btn btn-danger ml-2 mr-2',
        cancelButton: 'btn btn-outline-primary ml-2 mr-2',
      },
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.autorService.eliminar(obj.idAutor || 0).subscribe((x) => {
          Swal.fire('Mensaje', x.mensaje, 'success');
          this.autorService
            .listarCrudConFiltro(this.nombres, this.apellidos)
            .subscribe((x) => {
              this.listaAutores = x.lista;
            });
        });
      }
    });
  }

  cambiarEstado(obj: Autor) {
    obj.estado = obj.estado == 1 ? 0 : 1;
    console.log(JSON.stringify(obj));
    this.autorService.actualizar(obj).subscribe();
  }

  limpiarFiltro() {
    this.nombres = '';
    this.apellidos = '';
  }

  limpiarNgModel() {
    this.autor = {
      idAutor: 0,
      nombres: '',
      apellidos: '',
      fechaNacimiento: '',
      telefono: '',
      grado: {
        idGrado: -1,
      },
    };
  }

  cierraYlimpia(modal: string) {
    this.limpiarNgModel();    
    if (modal == 'agregar') {
      document.getElementById('btnCerrarModalAgregar')?.click();
    }
    if (modal == 'actualizar') {
      document.getElementById('btnCerrarModalActualizar')?.click();
      this.autorService
      .listarCrudConFiltro(this.nombres, this.apellidos)
      .subscribe((x) => {
        this.listaAutores = x.lista;
      });
    }
  }

  buscaYabre(obj: Autor, modal: string) {
    if (modal == 'actualizar') {
      document.getElementById('btnAbrirModalActualizar')?.click();
    }
    this.autor = obj;
  }


}
