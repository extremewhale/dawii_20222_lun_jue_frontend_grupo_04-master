import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/models/categoria.model';
import { Libro } from 'src/app/models/libro.model';
import { LibroService } from 'src/app/services/libro.service';
import { UtilService } from 'src/app/services/util.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-agregar-libro',
  templateUrl: './agregar-libro.component.html',
  styleUrls: ['./agregar-libro.component.css']
})
export class AgregarLibroComponent implements OnInit {

  categorias: Categoria[] = [];
  libro: Libro ={
      categoria:{
        idCategoria:-1
      }
  }

  constructor(private libroService:LibroService , private utilService: UtilService) {
        utilService.listaCategoria().subscribe(x=>{
              this.categorias=x;
        })
  }

  registraLibro(){
        this.libroService.registrar(this.libro)
        .subscribe(
          x=>{
            Swal.fire({
              icon: 'success',
              title: 'Registro Exitoso',
              text: x.errores,
            })
          },
        )
  }

  ngOnInit(): void {
  }

}
