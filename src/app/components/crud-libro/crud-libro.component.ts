import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Libro } from 'src/app/models/libro.model';
import { Categoria } from 'src/app/models/categoria.model';
import { UtilService } from 'src/app/services/util.service';
import { LibroService } from 'src/app/services/libro.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-crud-libro',
  templateUrl: './crud-libro.component.html',
  styleUrls: ['./crud-libro.component.css']
})
export class CrudLibroComponent implements OnInit {

  selCategoria:number = 0;
  fecha:string="";
  //Para la Grilla
  libros: Libro [] = [];
  filtro: string ="";
  

  //Para el ubigeo
  categorias: Categoria[] = [];;
  
  //Json para registrar o actualizar
  libro: Libro = { 
    idLibro:-1,
    titulo:"",
    anio:"",
    serie:"",
    fechaRegistro: "",
    estado:1,
    categoria:{
      idCategoria: -1,
      descripcion: "",
    }
  };

  //para verificar que e pulsó el boton
  submitted = false;

  formsRegistra = new FormGroup({
    validaNombre: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]{3,30}')]),
  validaSerie: new FormControl('', [Validators.required]),
  validaCategoria: new FormControl('', [Validators.min(1)]),
  validaAnio: new FormControl('', [Validators.min(1)]),
  validaEstado: new FormControl('', [Validators.min(0)]),
});

formsActualiza = new FormGroup({
  validaNombre: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]{3,30}')]),
  validaSerie: new FormControl('', [Validators.required]),
  validaCategoria: new FormControl('', [Validators.min(1)]),
  validaAnio: new FormControl('', [Validators.min(1)]),
  validaEstado: new FormControl('', [Validators.min(0)]),
});

constructor(private libroService:LibroService , private utilService: UtilService) {
  utilService.listaCategoria().subscribe(x=>{
        this.categorias=x;
  })
  
}

cargaCategoria(){
  this.utilService.listaCategoria().subscribe(
    response =>  this.categorias= response
  );

  this.categorias = [];
}

  ngOnInit(): void {
  }


  consulta(){
    this.libroService.consultaPorNombre(this.filtro==""?"todos":this.filtro).subscribe(
          x => this.libros = x
    );
}

registra(){
  this.submitted = true;

        //finaliza el método si hay un error
        if (this.formsRegistra.invalid){
         return;
        }

        this.submitted = false;

        this.libroService.registrarCrud(this.libro).subscribe(
             x => { 
                    document.getElementById("btn_reg_cerrar")?.click();
                    Swal.fire('Mensaje', x.mensaje,'info'); 
                    this.libroService.consultaPorNombre(this.filtro==""?"todos":this.filtro).subscribe(
                        x => this.libros = x
                    ); 
             }
        );

         //limpiar los comobobox
         this.categorias = [];
 
         //limpiar los componentes del formulario a través de los ngModel
          this.libro = { 
            idLibro:-1,
            titulo:"",
            anio:"",
            serie:"",
            fechaRegistro: "",
            estado:1,
            categoria:{
              idCategoria: -1,
              descripcion: "",
            }
         }

}

actualizaEstado(obj:Libro){
  obj.estado = obj.estado == 1? 0 : 1;  
  this.libroService.actualiza(obj).subscribe();
}

busca(obj:Libro){
  this.libro = obj;

  this.utilService.listaCategoria().subscribe(
    response =>  this.categorias= response
  );
}

actualiza(){
  this.submitted = true;

  //finaliza el método si hay un error
  if (this.formsActualiza.invalid){
   return;
  }

  this.submitted = false;

  this.libroService.actualiza(this.libro).subscribe(
          x => {
               document.getElementById("btn_act_cerrar")?.click();
               Swal.fire('Mensaje', x.mensaje,'info'); 
               this.libroService.consultaPorNombre(this.filtro==""?"todos":this.filtro).subscribe(
                   x => this.libros = x
               ); 
          }
    );

     //limpiar los comobobox
  this.categorias = [];

  //limpiar los componentes del formulario a través de los ngModel

  this.libro = { 
    idLibro:0,
    titulo:"",
    anio:"",
    serie:"",
    fechaRegistro: "",
    estado:1,
    categoria:{
      idCategoria: 0,
      descripcion: "",
    }
  }
}

elimina(obj:Libro){
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
        
        this.libroService.elimina(obj.idLibro || 0).subscribe(
            x  =>  {
                  Swal.fire('Mensaje',x.mensaje,'success');
                  this.libroService.consultaPorNombre(this.filtro==""?"todos":this.filtro).subscribe(
                        x => this.libros = x
                  ); 
            } 
        );
        
      }
  })
}

}
