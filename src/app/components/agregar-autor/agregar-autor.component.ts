import { Component, OnInit } from '@angular/core';
import { UtilService } from 'src/app/services/util.service';
import { AutorService } from 'src/app/services/autor.service';
import { Autor } from 'src/app/models/autor.model';
import { Grado } from 'src/app/models/grado.model';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-agregar-autor',
  templateUrl: './agregar-autor.component.html',
  styleUrls: ['./agregar-autor.component.css']
})
export class AgregarAutorComponent implements OnInit {

  listGrados: Grado[] = [];
  autor: Autor ={
    grado:{
      idGrado:-1
    }
  }

  constructor(private utilService: UtilService, private autorService : AutorService) {
    this.utilService.listaGrado().subscribe(x=>{
          this.listGrados=x;
    })
  }

  insertar(){
    this.autorService.insertar(this.autor).subscribe(
      x => {
        Swal.fire({
          icon: 'success',
          title: 'Registro Exitoso',
          text: x.errores,
        })
      },
    );
  }

  ngOnInit(): void {
  }

}
