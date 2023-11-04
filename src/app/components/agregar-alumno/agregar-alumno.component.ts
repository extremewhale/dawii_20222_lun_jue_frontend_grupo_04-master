import { Component, OnInit } from '@angular/core';
import { UtilService } from 'src/app/services/util.service';
import { AlumnoService } from 'src/app/services/alumno.service';
import { Alumno } from 'src/app/models/alumno.model';
import { Pais } from 'src/app/models/pais.model';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-agregar-alumno',
  templateUrl: './agregar-alumno.component.html',
  styleUrls: ['./agregar-alumno.component.css']
})
export class AgregarAlumnoComponent implements OnInit {

  listPaises: Pais[] = [];
  alumno: Alumno ={
    nombre:{
      idPais:-1
    }
  }

  constructor(private utilService: UtilService, private alumnoService : AlumnoService) {

    this.utilService.listaPais().subscribe(x=>{
      this.listPaises=x;
    })

  }

  ngOnInit(): void {
  }

  insertar(){
    this.alumnoService.inserta(this.alumno).subscribe(
      x => alert(x.errores)
    );
   }

}
