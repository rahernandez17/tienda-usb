import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { EstadoPedido } from 'src/app/core/interfaces/estado-pedido/estado-pedido.interface';
import { Subject, takeUntil } from 'rxjs';
import { Cliente } from 'src/app/core/interfaces/cliente/cliente.interface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PedidoService } from 'src/app/core/services/pedido/pedido.service';
import { ClienteService } from 'src/app/core/services/cliente/cliente.service';
import {
  ActualizaPedidoRequest,
  GuardaPedidoRequest,
  Pedido,
} from 'src/app/core/interfaces/pedido/pedido.interface';
import { EstadoPedidoService } from 'src/app/core/services/estado-pedido/estado-pedido.service';
import { SwalUtil } from 'src/app/core/utils/swal.util';
import { SimpleResponse } from 'src/app/core/interfaces/simple-response.interface';

@Component({
  selector: 'app-formulario-pedidos',
  templateUrl: './formulario-pedidos.component.html',
  styleUrls: ['./formulario-pedidos.component.scss'],
})
export class FormularioPedidosComponent implements OnInit {
  private readonly destroy$: Subject<any> = new Subject();

  estadosPedido: EstadoPedido[] = [];

  clientes: Cliente[] = [];

  idPedidoEditar: number | null = null;

  pedidoForm!: FormGroup;

  isReadyForm!: Promise<any>;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly pedidoService: PedidoService,
    private readonly clienteService: ClienteService,
    private readonly estadoPedidoService: EstadoPedidoService,
    private readonly dialogRef: MatDialogRef<FormularioPedidosComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly data: { pedido: Pedido }
  ) {}

  get fecha(): FormControl {
    return this.pedidoForm.get('fecha') as FormControl;
  }

  get total(): FormControl {
    return this.pedidoForm.get('total') as FormControl;
  }

  get cliente(): FormControl {
    return this.pedidoForm.get('cliente') as FormControl;
  }

  get estadoPedido(): FormControl {
    return this.pedidoForm.get('estadoPedido') as FormControl;
  }

  ngOnInit(): void {
    this.obtenerEstadosPedido();
    this.obtenerClientes();
    this.iniciarFormulario();
    this.seleccionarPedidoEditar(this.data?.pedido);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  iniciarFormulario(): void {
    this.isReadyForm = Promise.resolve(
      (this.pedidoForm = this.formBuilder.group({
        fecha: [null, [Validators.required]],
        total: [null, [Validators.required, Validators.min(1)]],
        cliente: [null, [Validators.required]],
        estadoPedido: [null, [Validators.required]],
      }))
    );
  }

  seleccionarPedidoEditar(pedido: Pedido): void {
    if (pedido) {
      this.pedidoForm.patchValue({
        fecha: pedido.fecha.split('/').reverse().join('-'),
        total: pedido.total,
        cliente: pedido.clienteId,
        estadoPedido: pedido.estadoPedidoId,
      });
      this.idPedidoEditar = pedido.id;
    }
  }

  obtenerEstadosPedido() {
    this.estadoPedidoService
      .obtenerTodos()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => (this.estadosPedido = response.valor),
      });
  }

  obtenerClientes() {
    this.clienteService
      .obtenerTodos()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => (this.clientes = response.valor),
      });
  }

  async guardar(): Promise<void> {
    if (this.pedidoForm.invalid) {
      await SwalUtil.showAlert(
        'Información',
        'Complete los campos requeridos',
        'error'
      );
      return;
    }

    const pedido: GuardaPedidoRequest = {
      fecha: this.fecha.value,
      total: this.total.value,
      clienteId: this.cliente.value,
      estadoPedidoId: this.estadoPedido.value,
    };

    this.pedidoService.guardar(pedido).subscribe({
      next: (response) => {
        SwalUtil.showAlert('Información', response.mensaje, 'success').then(
          () => {
            this.pedidoForm.reset();
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
    if (this.pedidoForm.invalid) {
      await SwalUtil.showAlert(
        'Información',
        'Complete los campos requeridos',
        'error'
      );
      return;
    }

    const pedido: ActualizaPedidoRequest = {
      id: this.idPedidoEditar ?? -1,
      fecha: this.fecha.value,
      total: this.total.value,
      clienteId: this.cliente.value,
      estadoPedidoId: this.estadoPedido.value,
    };

    this.pedidoService.actualizar(pedido).subscribe({
      next: (response) => {
        SwalUtil.showAlert('Información', response.mensaje, 'success').then(
          () => {
            this.pedidoForm.reset();
            this.idPedidoEditar = null;
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
