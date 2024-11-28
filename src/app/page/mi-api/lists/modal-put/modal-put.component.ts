import { Component, ElementRef, EventEmitter, Inject, Input, Output, PLATFORM_ID, ViewChild } from '@angular/core';
import { EmpleadosService } from '../services/empleados.service';
import { isPlatformBrowser, NgIf } from '@angular/common';
import { Empleado } from '../interface/empleados';

@Component({
  selector: 'app-modal-put',
  standalone: true,
  imports: [],
  templateUrl: './modal-put.component.html',
  styleUrl: './modal-put.component.css'
})
export class ModalPutComponent {
  private bootstrapModal: any;
  @ViewChild('modalEditar') public modal!: ElementRef;
  @Input() empleado: Empleado = {
    nombreEmpleado: '',
    puesto: '',
    salario: 0,
    estado: ''
  };
  @Output() onEmpleadoEditado = new EventEmitter<void>();

  constructor(
    @Inject(PLATFORM_ID) private plataformaId: object,
    private _empleadoService: EmpleadosService
  ) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.plataformaId)) {
      this.inicializarModal();
    }
  }

  inicializarModal() {
    import('bootstrap').then((bootstrap) => {
      this.bootstrapModal = new bootstrap.Modal(this.modal.nativeElement);
    });
  }

  open(emplea: Empleado) {
    this.empleado = emplea;
    if (isPlatformBrowser(this.plataformaId)) {
      // Asegúrate de que el modal esté inicializado
      if (!this.bootstrapModal) {
        this.inicializarModal();
        setTimeout(() => {
          if (this.bootstrapModal) {
            this.bootstrapModal.show();
          } else {
            console.error('El modal no se inicializó correctamente.');
          }
        }, 0);  // Usa un setTimeout para asegurarte de que se complete la inicialización antes de mostrarlo
      } else {
        this.bootstrapModal.show();
      }
    }
  }
  

  closeModal() {
    if (isPlatformBrowser(this.plataformaId)) {
      if (this.bootstrapModal) {
        this.bootstrapModal.hide();
      } else {
        console.error('El modal no está inicializado.');
      }
    }
  }

  editarEmpleado(
    nombreEmpleado: string,
    puesto: string,
    salario: string,
    estado: string,
    id: string
  ) {
    const empleadoEditado: Empleado = {
      nombreEmpleado: nombreEmpleado,
      puesto: puesto,
      salario: Number(salario),
      estado: estado,
    };

    this._empleadoService.putEmpleado(id, empleadoEditado).subscribe({
      next: () => {
        console.log('Empleado editado exitosamente.');
        this.closeModal();
        this.onEmpleadoEditado.emit();
      },
      error: (error) => {
        console.error(`Error al editar empleado: ${error}`);
      },
    });
  }
}
