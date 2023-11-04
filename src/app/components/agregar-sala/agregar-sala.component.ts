import { Component, OnInit } from '@angular/core';
import { UtilService } from 'src/app/services/util.service';
import { SalaService } from 'src/app/services/sala.service';
import { Sala } from 'src/app/models/sala.model';
import { Sede } from 'src/app/models/sede.model';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-agregar-sala',
  templateUrl: './agregar-sala.component.html',
  styleUrls: ['./agregar-sala.component.css']
})
export class AgregarSalaComponent implements OnInit {

  listarSedes: Sede[] = [];
  sala: Sala ={
    sede:{
      idSede:-1
    }
  }

  constructor(private utilService: UtilService, private salaService : SalaService) { 

    this.utilService.listaSede().subscribe(x=>{
      this.listarSedes=x;

    })

  }

  insertar(){
    this.salaService.insertar(this.sala).subscribe(
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
