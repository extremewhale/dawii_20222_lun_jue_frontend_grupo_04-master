import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Sala } from 'src/app/models/sala.model';
import { Sede } from 'src/app/models/sede.model';
import { SalaService } from 'src/app/services/sala.service';
import { UtilService } from 'src/app/services/util.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-crud-sala',
  templateUrl: './crud-sala.component.html',
  styleUrls: ['./crud-sala.component.css']
})
export class CrudSalaComponent implements OnInit {

 numero:string="";
 recursos:string="";
 selSede:number = -1; 
 estado:boolean = true;
 filtro: string = "";

 sedes: string[]  = [];
 lstSede: Sede[] = [];
 listaSalas: Sala[] = [];

 sala: Sala = { 
  idSala:0,
  numero:"",
  piso:0,
  numAlumnos:0 ,
  recursos:"",
  fechaRegistro:undefined,
  estado:1,
  sede:{
    idSede: -1,
  }
};
 submitted = false;

 formsRegistra = new FormGroup({
   validaNumero: new FormControl('', [Validators.required]),
   validaPiso: new FormControl('', [Validators.required]),
   validanumAlumnos: new FormControl('', [Validators.required]),
   validaRecursos: new FormControl('', [Validators.required, Validators.pattern('[a-zA-ZáéíóúÁÉÍÓÚñ0-9 ]{3,30}')]),
   //validaFecha: new FormControl('', [Validators.required]),
   validaSede: new FormControl('', [Validators.min(1)]),
   
});
formsActualiza = new FormGroup({
  validaNumero: new FormControl('', [Validators.required]),
  validaPiso: new FormControl('', [Validators.required]),
  validanumAlumnos: new FormControl('', [Validators.required]),
  validaRecursos: new FormControl('', [Validators.required, Validators.pattern('[a-zA-ZáéíóúÁÉÍÓÚñ0-9 ]{3,30}')]),
  validaFecha: new FormControl('', [Validators.required]),
  validaSede: new FormControl('', [Validators.min(1)]),
  validaEstado: new FormControl('', [Validators.min(0)]),
  
});

 constructor(private utilService: UtilService, private salaService : SalaService) {

   this.utilService.listaSede().subscribe(x=>{
     this.lstSede=x;
})
  }

 ngOnInit(): void {
 }




 consultaSala(){
  console.log("HOLA CONSULTA ;" ,this.recursos);

  if (this.recursos == "") {
    console.log("HOLA CONSULTA 1111" );
    this.salaService.listaSala(this.numero, this.recursos, this.selSede, this.estado?1:0).subscribe(
      x =>{
          this.listaSalas = x.lista;
          Swal.fire('Mensaje', x.mensaje,'info');
      } 
  );

  } else {
    console.log("HOLA CONSULTA 2222" );
    this.consultaSalaPorRecursos();
  }

}

consultaSalaPorRecursos(){
  console.log("HOLA CONSULTA 2222 ;" ,this.recursos);
  this.salaService.consultaPorRecursos(this.recursos).subscribe(
    x =>{
    this.listaSalas = x.lista;
    Swal.fire('Mensaje', x.mensaje,'info');
  });
}



 registra(){
    this.submitted = true;

    if (this.formsRegistra.invalid){
    return;
    }

    this.submitted = false;

    console.log("ENTRA");
    console.log("SALA: " , this.sala);
    this.salaService.insertaSala(this.sala).subscribe(
        (x) => { 
                document.getElementById("btn_reg_cerrar")?.click();
                Swal.fire('Mensaje', x.mensaje,'info'); 
                this.salaService.listaSala(this.numero, this.recursos, this.selSede, this.estado?1:0).subscribe(
                  (x) =>{
                      this.listaSalas = x.lista;
                  } 
              );
        }
    );

    console.log("SALE");


      this.sala = { 
          idSala:0,
          numero:"",
          piso:1,
          numAlumnos:1,
          recursos:"",
          fechaRegistro: new Date(),
          sede:{idSede:-1,}
            
          }
    }

    actualizaEstado(obj:Sala){
      obj.estado = obj.estado == 1? 0 : 1;  
      this.salaService.actualiza(obj).subscribe();
    }

  busca(obj:Sala) {
    this.sala = obj;
}

 elimina(obj:Sala){
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
      
      this.salaService.elimina(obj.idSala || 0).subscribe(
          x  =>  {
                Swal.fire('Mensaje',x.mensaje,'success');
                this.salaService.consultaPorRecursos(this.filtro==""?"todos":this.filtro).subscribe(
                      x => this.listaSalas = x
                ); 
          } 
      );
      
    }
})}


actualiza(){
  this.submitted = true;

  if (this.formsActualiza.invalid){
   return;
  }

  this.submitted = false;

  this.salaService.actualiza(this.sala).subscribe(
          (x) => { 
              document.getElementById("btn_reg_cerrar")?.click();
              Swal.fire('Mensaje', x.mensaje,'info'); 
              this.salaService.listaSala(this.numero, this.recursos, this.selSede, this.estado?1:0).subscribe(
                (x) =>{
                    this.listaSalas = x.lista;
                } 
            );}
    );


  this.sala = { 
    idSala: 0,
    numero:"",
    piso:1,
    numAlumnos:1,
    recursos:"",
    fechaRegistro: new Date(),
    sede:{
      idSede:-1,
    }
      
    }
  }
}