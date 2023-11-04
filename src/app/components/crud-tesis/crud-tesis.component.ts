import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Tesis } from 'src/app/models/tesis.model';
import { Alumno } from 'src/app/models/alumno.model';
import { TesisService } from 'src/app/services/tesis.service';
import { AlumnoService } from 'src/app/services/alumno.service';
import { UtilService } from 'src/app/services/util.service';
import Swal from 'sweetalert2'
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-crud-tesis',
  templateUrl: './crud-tesis.component.html',
  styleUrls: ['./crud-tesis.component.css']
})
export class CrudTesisComponent implements OnInit {

    //Ng model
  titulo:string="";
  tema:string="";
  selAlumno:number = -1; 
  estado:boolean = true;
  filtro: string ="";

  //Alumno
  alumnos: string[]  = [];
  lstAlumnos: Alumno[] = [];
  tesis: Tesis[] = [];

   //Json para registrar o actualizar
 tesi: Tesis = { 
  idTesis:0,
  titulo:"",
  tema:"",
  fechaCreacion:new Date(''),
  alumno:{
    idAlumno: -1,
  }
};

  //para verificar que se pulsó el boton
 submitted = false;

 formsRegistra = new FormGroup({
   validaTitulo: new FormControl('', [Validators.required, Validators.pattern('[a-zA-ZáéíóúÁÉÍÓÚñ0-9 ]{3,100}')]),
   validaTema: new FormControl('', [Validators.required,Validators.pattern('[a-zA-ZáéíóúÁÉÍÓÚñ0-9 ]{3,100}')]),
   validafechaCreacion :new FormControl('', [Validators.required]),
   validaAlumno: new FormControl('', [Validators.min(1)]),
   
});

formsActualiza = new FormGroup({
  validaTitulo: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]{3,100}')]),
  validaTema: new FormControl('', [Validators.required,Validators.pattern('[a-zA-Z ]{3,100}')]),
  validafechaCreacion :new FormControl('', [Validators.required]),
  validaAlumno: new FormControl('', [Validators.min(1)]),
  validaEstado: new FormControl('', [Validators.min(0)]),
 });

   constructor(private utilService: UtilService, private tesisService : TesisService) {

    this.utilService.listaAlumno().subscribe(x=>{
      this.lstAlumnos=x;
})
   }
   

consulta(){
  this.tesisService.consultaPorTitulo(this.titulo).subscribe(
    x =>{
      this.tesis = x.lista;
      Swal.fire({
        icon: 'info',
        title: 'Consulta exitosa',
            text: x.mensaje,
           
      })
      
  }
  );
}

  ngOnInit(): void {
  }

  
 

registra(){
  this.submitted = true;

       //finaliza el método si hay un error
       if (this.formsRegistra.invalid){
        return;
       }

       this.submitted = false;

       this.tesisService.insertaTesis(this.tesi).subscribe(
            (x) => { 
                   document.getElementById("btn_reg_cerrar")?.click();
                   Swal.fire('Mensaje', x.mensaje,'info'); 
                   this.tesisService.consultaPorTitulo(this.titulo).subscribe(
                    (x) => {this.tesis = x.lista;}
                   ); 
            }
       );

       

        //limpiar los componentes del formulario a través de los ngModel
         this.tesi = { 
              idTesis:0,
              titulo:"",
              tema:"",
              fechaCreacion:new Date(),
              alumno:{
                idAlumno: -1,
                
              }
        }
}

actualizaEstado(obj:Tesis){
  obj.estado = obj.estado == 1? 0 : 1;  
  this.tesisService.actualiza(obj).subscribe();
}
busca(obj:Tesis){
  this.tesi = obj;
}
elimina(obj:Tesis){
  
    Swal.fire({
      title: '¿Desea eliminar?',
      text: "Los cambios no se van a revertir",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, elimina.',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
          
          this.tesisService.elimina(obj.idTesis || 0).subscribe(
              (x)  =>  {
                    Swal.fire('Mensaje',x.mensaje,'success');
                    this.tesisService.consultaPorTitulo(this.titulo).subscribe(
                          (x) => {this.tesis = x.lista;}
                    ); 
              } 
          );
          
        }
    })
}









actualiza(){
  this.submitted = true;

  //finaliza el método si hay un error
  if (this.formsActualiza.invalid){
   return;
  }

  this.submitted = false;

  this.tesisService.actualiza(this.tesi).subscribe(
          (x) => {
               document.getElementById("btn_act_cerrar")?.click();
               Swal.fire('Mensaje', x.mensaje,'info'); 
               this.tesisService.consultaPorTitulo(this.titulo).subscribe(
                (x) => {this.tesis = x.lista;}
               ); 
          }
    );

  //limpiar los componentes del formulario a través de los ngModel

  this.tesi = { 
    idTesis:0,
    titulo:"",
    tema:"",
    fechaCreacion:new Date(),
    alumno:{
      idAlumno: -1,
      
    }}
}

}
