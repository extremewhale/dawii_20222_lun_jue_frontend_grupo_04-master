import { Component, OnInit } from '@angular/core';
import { Pais } from 'src/app/models/pais.model';
import { Prueba } from 'src/app/models/prueba.model';
import { PruebaService } from 'src/app/services/prueba.service';
import { UtilService } from 'src/app/services/util.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-agregar-prueba',
  templateUrl: './agregar-prueba.component.html',
  styleUrls: ['./agregar-prueba.component.css']
})
export class AgregarPruebaComponent implements OnInit {

  paises: Pais[] = [];
  prueba: Prueba ={
      pais:{
        idPais:-1
      }
  }

  constructor(private pruebaService:PruebaService , private utilService: UtilService) {
        utilService.listaPais().subscribe(x=>{
              this.paises=x;
        })
  }

  registraPrueba(){
        this.pruebaService.registrar(this.prueba).subscribe(
          x=>{
            Swal.fire({
              icon: 'info',
              title: 'Resultado del Registro',
              text: x.errores,
            })
          },
        );
  }

  ngOnInit(): void {
  }

}
