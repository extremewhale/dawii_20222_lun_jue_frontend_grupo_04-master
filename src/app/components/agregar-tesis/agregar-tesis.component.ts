import { Component, OnInit } from '@angular/core';
import { AlumnoService } from 'src/app/services/alumno.service';
import { TesisService } from 'src/app/services/tesis.service';
import { UtilService } from 'src/app/services/util.service';
import { Tesis } from 'src/app/models/tesis.model';
import { Alumno } from 'src/app/models/alumno.model';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-agregar-tesis',
  templateUrl: './agregar-tesis.component.html',
  styleUrls: ['./agregar-tesis.component.css']
})
export class AgregarTesisComponent implements OnInit {

  lstAlumnos: Alumno[] = [];
  tesis: Tesis ={
    alumno:{
      idAlumno:-1
    }
  }

  constructor(private utilService: UtilService, private tesisService : TesisService) {

    this.utilService.listaAlumno().subscribe(x=>{
      this.lstAlumnos=x;
})
   }

   inserta(){
    this.tesisService.inserta(this.tesis).subscribe(
      x=>{
        Swal.fire({
          icon: 'info',
          title: 'Registrado correctamente',
          text: x.errores,
        })
      },
    );
   }

  ngOnInit(): void {
  }


}
