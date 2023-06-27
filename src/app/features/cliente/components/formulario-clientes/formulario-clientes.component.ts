import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import {
  ActualizaClienteRequest,
  Cliente,
  GuardaClienteRequest,
} from 'src/app/core/interfaces/cliente/cliente.interface';
import { SimpleResponse } from 'src/app/core/interfaces/simple-response.interface';
import { TipoDocumento } from 'src/app/core/interfaces/tipo-documento/tipo-documento.interface';
import { ClienteService } from 'src/app/core/services/cliente/cliente.service';
import { TipoDocumentoService } from 'src/app/core/services/tipo-documento/tipo-documento.service';
import { SwalUtil } from 'src/app/core/utils/swal.util';

@Component({
  selector: 'app-formulario-clientes',
  templateUrl: './formulario-clientes.component.html',
  styleUrls: ['./formulario-clientes.component.scss'],
})
export class FormularioClientesComponent {
  private readonly destroy$: Subject<any> = new Subject();

  tiposDocumento: TipoDocumento[] = [];

  idClienteEditar: number | null = null;

  clienteForm!: FormGroup;

  isReadyForm!: Promise<any>;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly clienteService: ClienteService,
    private readonly tipoDocumentoService: TipoDocumentoService,
    private readonly dialogRef: MatDialogRef<FormularioClientesComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly data: { cliente: Cliente }
  ) {}

  get nombres(): FormControl {
    return this.clienteForm.get('nombres') as FormControl;
  }

  get apellidos(): FormControl {
    return this.clienteForm.get('apellidos') as FormControl;
  }

  get documento(): FormControl {
    return this.clienteForm.get('documento') as FormControl;
  }

  get estado(): FormControl {
    return this.clienteForm.get('estado') as FormControl;
  }

  get tipoDocumento(): FormControl {
    return this.clienteForm.get('tipoDocumento') as FormControl;
  }

  ngOnInit(): void {
    this.obtenerTiposDocumento();
    this.iniciarFormulario();
    this.seleccionarClienteEditar(this.data?.cliente);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  iniciarFormulario(): void {
    this.isReadyForm = Promise.resolve(
      (this.clienteForm = this.formBuilder.group({
        nombres: [null, [Validators.required, Validators.maxLength(50)]],
        apellidos: [null, [Validators.required, Validators.maxLength(50)]],
        documento: [null, [Validators.required, Validators.maxLength(50)]],
        estado: [null, [Validators.required]],
        tipoDocumento: [null, [Validators.required]],
      }))
    );
  }

  seleccionarClienteEditar(cliente: Cliente): void {
    if (cliente) {
      this.clienteForm.patchValue({
        nombres: cliente.nombres,
        apellidos: cliente.apellidos,
        documento: cliente.documento,
        estado: cliente.estado,
        tipoDocumento: cliente.tipoDocumentoId,
      });
      this.idClienteEditar = cliente.id;
    }
  }

  obtenerTiposDocumento() {
    this.tipoDocumentoService
      .obtenerTodos()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => (this.tiposDocumento = response.valor),
      });
  }

  async guardar(): Promise<void> {
    if (this.clienteForm.invalid) {
      await SwalUtil.showAlert(
        'Información',
        'Complete los campos requeridos',
        'error'
      );
      return;
    }

    const cliente: GuardaClienteRequest = {
      nombres: this.nombres.value,
      apellidos: this.apellidos.value,
      documento: this.documento.value,
      estado: this.estado.value,
      tipoDocumentoId: this.tipoDocumento.value,
    };

    this.clienteService.guardar(cliente).subscribe({
      next: (response) => {
        SwalUtil.showAlert('Información', response.mensaje, 'success').then(
          () => {
            this.clienteForm.reset();
            this.dialogRef.close(response.valor);
          }
        );
      },
      error: (error: SimpleResponse<any>) => {
        SwalUtil.showAlert('Información', error.mensaje, 'error');
        console.log(error);
      },
    });
  }

  async editar(): Promise<void> {
    if (this.clienteForm.invalid) {
      await SwalUtil.showAlert(
        'Información',
        'Complete los campos requeridos',
        'error'
      );
      return;
    }

    const cliente: ActualizaClienteRequest = {
      id: this.idClienteEditar ?? -1,
      nombres: this.nombres.value,
      apellidos: this.apellidos.value,
      documento: this.documento.value,
      estado: this.estado.value,
      tipoDocumentoId: this.tipoDocumento.value,
    };

    this.clienteService.actualizar(cliente).subscribe({
      next: (response) => {
        SwalUtil.showAlert('Información', response.mensaje, 'success').then(
          () => {
            this.clienteForm.reset();
            this.idClienteEditar = null;
            this.dialogRef.close(response.valor);
          }
        );
      },
      error: (error: SimpleResponse<any>) => {
        SwalUtil.showAlert('Información', error.mensaje, 'error');
        console.log(error);
      },
    });
  }
}
