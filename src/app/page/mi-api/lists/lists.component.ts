import { Component, OnInit, ViewChild } from '@angular/core';
import { EmpleadosService } from './services/empleados.service';
import { Empleados } from './interface/empleados';
import { ListaempleadosComponent } from "./listaempleados/listaempleados.component";
import { ModalPostComponent } from "./modal-post/modal-post.component";

@Component({
  selector: 'app-lists',
  standalone: true,
  imports: [ListaempleadosComponent, ModalPostComponent],
  templateUrl: './lists.component.html',
  styleUrl: './lists.component.css'
})
export class ListsComponent implements OnInit{
  empleados:Empleados | undefined

  @ViewChild(ModalPostComponent) public modal!:ModalPostComponent

  constructor(private _srvEmpleados:EmpleadosService){}

  ngOnInit(): void {
    this._srvEmpleados.getAllEmpleados().subscribe(empleado => {
      this.empleados = empleado
    })
  }

  cargarApi(): void{
    this._srvEmpleados.getAllEmpleados().subscribe(empleado => {
      this.empleados = empleado
    })
  }

  onAgregarElemnto(){
    this.cargarApi()
  }

  openModal(){
    if(this.modal){
      this.modal.open();
    }
  }
}
