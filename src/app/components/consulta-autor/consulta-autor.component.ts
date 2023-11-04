import { Component, OnInit } from '@angular/core';
import { Autor } from 'src/app/models/autor.model';
import { Grado } from 'src/app/models/grado.model';
import { AutorService } from 'src/app/services/autor.service';
import { UtilService } from 'src/app/services/util.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-consulta-autor',
  templateUrl: './consulta-autor.component.html',
  styleUrls: ['./consulta-autor.component.css']
})
export class ConsultaAutorComponent implements OnInit {

  //Ng Model
  nombres:    string  = "";
  apellidos:  string  = "";
  telefono:   string  = "";
  cboGrados:  number  = -1; 
  estado:     boolean = true;

  //Grilla
  autores: string[]  = [];

  //Listas
  listaGrados:  Grado[] = [];
  listaAutores: Autor[] = [];

  constructor(private utilService: UtilService, private autorService : AutorService) { 

    this.utilService.listaGrado().subscribe( x => {
      this.listaGrados = x;
    })

  }

  ngOnInit(): void {
  }

  consultar(){

    this.autorService.listaConFiltro(this.nombres, this.apellidos, this.telefono, this.cboGrados, this.estado?1:0).subscribe(
      x => {
        this.listaAutores = x.lista;
        Swal.fire({
          icon: 'info',
          title: 'Consulta exitosa',
          text: x.mensaje,
        })
      } 
    );
  }


  limpiarfiltro() {
    this.nombres    = "";
    this.apellidos  = "";
    this.telefono   = "";
    this.cboGrados  = -1; 
    this.estado     = true;
  }


}
