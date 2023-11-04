import { Component, OnInit } from '@angular/core';
import { LibroService } from 'src/app/services/libro.service';
import { UtilService } from 'src/app/services/util.service';
import { Categoria } from 'src/app/models/categoria.model';
import { Libro } from 'src/app/models/libro.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-consulta-libro',
  templateUrl: './consulta-libro.component.html',
  styleUrls: ['./consulta-libro.component.css']
})
export class ConsultaLibroComponent implements OnInit {

  //Ng model
  titulo:string="";
  serie:string="";
  selCategoria:number = 0;
  estado:boolean = true;
  fechaInicio:string="";
  fechaFin:string="";


  //Grila
  libros: Libro[] = [];

  

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


consultaLibro(){
  this.libroService.listaLibro(this.titulo, this.serie, this.selCategoria, this.estado?1:0, this.fechaInicio, this.fechaFin).subscribe(
      x =>{
          this.libros = x.lista;
          Swal.fire('Mensaje', x.mensaje,'info');
      } 
  );
}

  ngOnInit(): void {
  }

}
