import { Component, Input, ViewChild } from '@angular/core';
import { Empleado, Empleados } from '../interface/empleados';
import { CommonModule, NgFor } from '@angular/common';
import { ModalPutComponent } from "../modal-put/modal-put.component";
import { EmpleadosService } from '../services/empleados.service';

@Component({
  selector: 'app-listaempleados',
  standalone: true,
  imports: [NgFor, CommonModule, ModalPutComponent],
  templateUrl: './listaempleados.component.html',
  styleUrl: './listaempleados.component.css'
})
export class ListaempleadosComponent {
  @Input() empleados: Empleados | undefined

  @ViewChild(ModalPutComponent) public modal!: ModalPutComponent 

  constructor(private _srvEmpleado:EmpleadosService){}

  actualizarElementos(){
    this._srvEmpleado.getAllEmpleados().subscribe(actt => {
      this.empleados = actt
    })
  }
  

  elimiminar(id:string){
    this._srvEmpleado.deleteEmpleado(id).subscribe({
      next: nest=> {
        this.actualizarElementos()
      }
    })
  }

  onEdit(){
    this.actualizarElementos()
  }

  openmodal(empleado:Empleado){
    this.modal.open(empleado)
  }
}
