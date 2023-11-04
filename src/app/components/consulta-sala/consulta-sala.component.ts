import { Component, OnInit } from '@angular/core';
import { Sala } from 'src/app/models/sala.model';
import { Sede } from 'src/app/models/sede.model';
import { SalaService } from 'src/app/services/sala.service';
import { UtilService } from 'src/app/services/util.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-consulta-sala',
  templateUrl: './consulta-sala.component.html',
  styleUrls: ['./consulta-sala.component.css']
})
export class ConsultaSalaComponent implements OnInit {

  //Ng model
  numero:string="";
  recursos:string="";
  selSede:number = -1; 
  estado:boolean = true;

  //Aluno
  sede: string[]  = [];
  lstSede: Sede[] = [];
  sala: Sala[] = [];

  constructor(private utilService: UtilService, private salaService : SalaService) {

    this.utilService.listaSede().subscribe(x=>{
      this.lstSede=x;
})
   }

   consultaSala(){
    this.salaService.listaSala(this.numero, this.recursos, this.selSede, this.estado?1:0).subscribe(
        x =>{
            this.sala = x.lista;
            Swal.fire('Mensaje', x.mensaje,'info');
        } 
    );
}

  ngOnInit(): void {
  }

}
