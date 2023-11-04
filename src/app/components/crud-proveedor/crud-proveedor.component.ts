
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { switchAll } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Pais } from 'src/app/models/pais.model';
import { Proveedor } from 'src/app/models/proveedor.model';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { UtilService } from 'src/app/services/util.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-consulta-proveedor',
  templateUrl: './crud-proveedor.component.html',
  styleUrls: ['./crud-proveedor.component.css']
})
export class CrudProveedorComponent implements OnInit {


  proveedor: Proveedor[] = [];
  listPais:Pais[] = [];
  filtro: string ="";


    //Json para registrar o actualizar
  provedor1: Proveedor = { 
    idProveedor:0,
    razonsocial:"",
     ruc:"",
     direccion:"",
     celular:"",
     contacto:"",
    estado:1,
    fechaRegistro:undefined,
    pais:{
      idPais: -1,
    }
  };


 
  
constructor(private proveedorService: ProveedorService, private utilService:UtilService) { 

    this.utilService.listaPais().subscribe(
      x => this.listPais = x
    );

  }



  ngOnInit(): void {
  }

   
     // PARA VALIDAR QUE PUSLO EL BOTÓN
     submitted = false;
     formsRegistra = new FormGroup({
      validaRazonSocial: new FormControl('',[Validators.required,Validators.pattern('[a-zA-ZáéíóúÁÉÍÓÚñ0-9 ]{1,30}')]),
      validaRuc: new FormControl('',[Validators.required,Validators.pattern('[0-9]{10}')]),
      validaDireccion: new FormControl('',[Validators.required,Validators.pattern('[a-zA-ZáéíóúÁÉÍÓÚ\.,\ñ0-9 ]{3,30}')]),
      validaCelular: new FormControl('',[Validators.required,Validators.pattern('[0-9]{8}')]),
      validaContacto: new FormControl('',[Validators.required,Validators.pattern('[a-zA-ZáéíóúÁÉÍÓÚñ0-9 ]{3,30}')]),
      validaPais:new FormControl('',[Validators.min(1)]),
     });

     formsActualiza = new FormGroup({
      validaRazonSocial: new FormControl('', [Validators.required, Validators.pattern('[a-zA-ZáéíóúÁÉÍÓÚñ0-9 ]{1,30}')]),
      validaRuc: new FormControl('', [Validators.required,Validators.pattern('[0-9]{10}')]),
      validaDireccion: new FormControl('', [Validators.required,Validators.pattern('[a-zA-ZáéíóúÁÉÍÓÚñ0-9 ]{1,30}')]),
      validaCelular: new FormControl('', [Validators.required, Validators.pattern('[0-9]{9}')]),
      validaContacto:new FormControl('', [Validators.required, Validators.pattern('[a-zA-ZáéíóúÁÉÍÓÚñ0-9 ]{1,30}')]),
      validaPais: new FormControl('', [Validators.min(1)]),
      validaEstado: new FormControl('', [Validators.min(0)]),
    });
 
  consultaProveedor1(){
      this.proveedorService.consultaProveedor(this.filtro==""?"todos":this.filtro).subscribe(
          x => this.proveedor = x
      )
  }


  clear(){
  this.provedor1={
    idProveedor:0,
    razonsocial:"",
     ruc:"",
     direccion:"",
     celular:"",
     contacto:"",
    estado:1,
    pais:{
      idPais: -1,


  }

  }
}

  registra(){

    this.submitted= true;
    //finaliza el metodo si hay error 
    if (this.formsRegistra.invalid){
      return;
    }

    this.submitted=false;

      /*console.log(">>> registra >> ");*/
      this.proveedorService.registraProveedor(this.provedor1).subscribe(
          x => {  
                   document.getElementById("btn_reg_limpiar")?.click();
                   document.getElementById("btn_reg_cerrar")?.click(); 
                   Swal.fire('Mensaje', x.mensaje,'info');
                   this.proveedorService.consultaProveedor(this.filtro==""?"todos":this.filtro).subscribe(
                      x => this.proveedor = x
                   ); 
               }
      )
  }

  busca(obj: Proveedor){
      console.log(">>> busca >> " + obj.idProveedor);
      this.provedor1 = obj;
      
      this.utilService.listaPais().subscribe(
        response =>  this.listPais= response
      );
  }

  cambiaEstado(obj:Proveedor){
      obj.estado =  obj.estado == 1 ? 0 : 1;
      this.proveedorService.actualizaProveedor(obj).subscribe();
  }

  actualiza(){
      console.log(">>> actualiza >> ");
      this.proveedorService.actualizaProveedor(this.provedor1).subscribe(
          x => {
                document.getElementById("btn_act_cerrar")?.click(); 
                Swal.fire('Mensaje', x.mensaje,'info');
                this.proveedorService.consultaProveedor(this.filtro==""?"todos":this.filtro).subscribe(
                    x => this.proveedor = x
                ); 
            }
      )
  }

 

elimina(obj :Proveedor){

  console.log(">>> elimina >> ");

  

  Swal.fire({

    title: 'Mensaje',

    text: "¿Desea eliminar?",

    icon: 'warning',

    showCancelButton: true,

    confirmButtonColor: '#3085d6',

    cancelButtonColor: '#d33',

    confirmButtonText: 'Sí, elimine',

    cancelButtonText: 'Cancelar'

  }).then((result) => {

    if (result.isConfirmed) {

      //elimino
          this.proveedorService.eliminaProveedor(obj.idProveedor || 0).subscribe(
           x => { Swal.fire('Mensaje',x.mensaje,'info');
            
      //actualizo 
           this.proveedorService.consultaProveedor(this.filtro==""?"todos":this.filtro).subscribe(
            x => this.proveedor = x
           );
          }
          );

    }

  })

}





}
