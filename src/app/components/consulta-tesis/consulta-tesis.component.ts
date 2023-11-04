import { Component, OnInit } from '@angular/core';
import { Tesis } from 'src/app/models/tesis.model';
import { Alumno } from 'src/app/models/alumno.model';
import { TesisService } from 'src/app/services/tesis.service';
import { AlumnoService } from 'src/app/services/alumno.service';
import { UtilService } from 'src/app/services/util.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-consulta-tesis',
  templateUrl: './consulta-tesis.component.html',
  styleUrls: ['./consulta-tesis.component.css']
})
export class ConsultaTesisComponent implements OnInit {

  //Ng model
  titulo:string="";
  tema:string="";
  selAlumno:number = -1; 
  estado:boolean = true;

  //Aluno
  alumnos: string[]  = [];
  lstAlumnos: Alumno[] = [];
  tesis: Tesis[] = [];

   constructor(private utilService: UtilService, private tesisService : TesisService) {

    this.utilService.listaAlumno().subscribe(x=>{
      this.lstAlumnos=x;
})
   }

   consultaTesis(){
    this.tesisService.listaTesis(this.titulo, this.tema, this.selAlumno, this.estado?1:0).subscribe(
        x =>{
            this.tesis = x.lista;
            Swal.fire('Mensaje', x.mensaje,'info');
        } 
    );
}

  ngOnInit(): void {
  }

}
