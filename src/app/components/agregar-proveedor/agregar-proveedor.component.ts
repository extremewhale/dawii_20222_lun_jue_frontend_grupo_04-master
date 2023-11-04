import { Component, OnInit } from '@angular/core';
import { UtilService } from 'src/app/services/util.service';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { Proveedor } from 'src/app/models/proveedor.model';
import { Pais } from 'src/app/models/pais.model';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-agregar-proveedor',
  templateUrl: './agregar-proveedor.component.html',
  styleUrls: ['./agregar-proveedor.component.css']
})
export class AgregarProveedorComponent implements OnInit {
  listPaises: Pais[] = [];
  proveedor: Proveedor = {
    pais: {
      idPais: -1
    }
  }

  constructor(private utilService: UtilService, private proveedorService: ProveedorService) {
    this.utilService.listaPais().subscribe(x => {
      this.listPaises = x;
    })
  }

  insertar() {
    this.proveedorService.insertar1(this.proveedor).subscribe(
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