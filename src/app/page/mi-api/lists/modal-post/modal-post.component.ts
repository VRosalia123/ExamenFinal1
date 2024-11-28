import { Component, ElementRef, EventEmitter, Inject, Output, PLATFORM_ID, ViewChild } from '@angular/core';
import { EmpleadosService } from '../services/empleados.service';
import { isPlatformBrowser } from '@angular/common';
import { Empleado } from '../interface/empleados';

@Component({
  selector: 'app-modal-post',
  standalone: true,
  imports: [],
  templateUrl: './modal-post.component.html',
  styleUrl: './modal-post.component.css'
})
export class ModalPostComponent {
  private bootstrapModal: any;
  @ViewChild('modalEmpleado') public modal!: ElementRef;
  @Output() onEmpleadoAgregado = new EventEmitter<void>();

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

  open() {
    if (isPlatformBrowser(this.plataformaId)) {
      if (this.bootstrapModal) {
        this.bootstrapModal.show();
      } else {
        this.inicializarModal();
        setTimeout(() => {
          this.bootstrapModal.show();
        }, 0);
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

  agregarEmpleado(
    nombreEmpleado: string,
    puesto: string,
    salario: string,
    estado: string
  ) {
    const nuevoEmpleado: Empleado = {
      nombreEmpleado: nombreEmpleado,
      puesto: puesto,
      salario: Number(salario),
      estado: estado,
    };

    this._empleadoService.postEmpleado(nuevoEmpleado).subscribe({
      next: () => {
        console.log('Empleado agregado exitosamente.');
        this.closeModal();
        this.onEmpleadoAgregado.emit();
      },
      error: (error) => {
        console.error(`Error al agregar empleado: ${error}`);
      },
    });
  }
}
