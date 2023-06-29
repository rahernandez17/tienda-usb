import { Component, OnInit, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import {
  ActualizaDetallePedidoRequest,
  DetallePedido,
  GuardaDetallePedidoRequest,
} from 'src/app/core/interfaces/detalle-pedido/detalle-pedido.interface';
import { Pedido } from 'src/app/core/interfaces/pedido/pedido.interface';
import { Producto } from 'src/app/core/interfaces/producto/producto.interface';
import { SimpleResponse } from 'src/app/core/interfaces/simple-response.interface';
import { DetallePedidoService } from 'src/app/core/services/detalle-pedido/detalle-pedido.service';
import { PedidoService } from 'src/app/core/services/pedido/pedido.service';
import { ProductoService } from 'src/app/core/services/producto/producto.service';
import { SwalUtil } from 'src/app/core/utils/swal.util';

@Component({
  selector: 'app-formulario-detalles-pedidos',
  templateUrl: './formulario-detalles-pedidos.component.html',
  styleUrls: ['./formulario-detalles-pedidos.component.scss'],
})
export class FormularioDetallesPedidosComponent implements OnInit {
  private readonly destroy$: Subject<any> = new Subject();

  pedidos: Pedido[] = [];

  productos: Producto[] = [];

  idDetallePedidoEditar: number | null = null;

  detallePedidoForm!: FormGroup;

  isReadyForm!: Promise<any>;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly detallePedidoService: DetallePedidoService,
    private readonly productoService: ProductoService,
    private readonly pedidoService: PedidoService,
    private readonly dialogRef: MatDialogRef<FormularioDetallesPedidosComponent>,
    @Inject(MAT_DIALOG_DATA)
    private readonly data: { detallePedido: DetallePedido }
  ) {}

  get cantidad(): FormControl {
    return this.detallePedidoForm.get('cantidad') as FormControl;
  }

  get valor(): FormControl {
    return this.detallePedidoForm.get('valor') as FormControl;
  }

  get producto(): FormControl {
    return this.detallePedidoForm.get('producto') as FormControl;
  }

  get pedido(): FormControl {
    return this.detallePedidoForm.get('pedido') as FormControl;
  }

  ngOnInit(): void {
    this.obtenerPedidos();
    this.obtenerProductos();
    this.iniciarFormulario();
    this.seleccionarDetallePedidoEditar(this.data?.detallePedido);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  iniciarFormulario(): void {
    this.isReadyForm = Promise.resolve(
      (this.detallePedidoForm = this.formBuilder.group({
        cantidad: [null, [Validators.required]],
        valor: [null, [Validators.required, Validators.min(1)]],
        pedido: [null, [Validators.required]],
        producto: [null, [Validators.required]],
      }))
    );
  }

  seleccionarDetallePedidoEditar(detallePedido: DetallePedido): void {
    if (detallePedido) {
      this.detallePedidoForm.patchValue({
        cantidad: detallePedido.cantidad,
        valor: detallePedido.valor,
        pedido: detallePedido.pedidoId,
        producto: detallePedido.productoId,
      });
      this.idDetallePedidoEditar = detallePedido.id;
    }
  }

  obtenerPedidos() {
    this.pedidoService
      .obtenerTodos()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => (this.pedidos = response.valor),
      });
  }

  obtenerProductos() {
    this.productoService
      .obtenerTodos()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => (this.productos = response.valor),
      });
  }

  async guardar(): Promise<void> {
    if (this.detallePedidoForm.invalid) {
      await SwalUtil.showAlert(
        'Información',
        'Complete los campos requeridos',
        'error'
      );
      return;
    }

    const detallePedido: GuardaDetallePedidoRequest = {
      cantidad: this.cantidad.value,
      valor: this.valor.value,
      pedidoId: this.pedido.value,
      productoId: this.producto.value,
    };

    this.detallePedidoService.guardar(detallePedido).subscribe({
      next: (response) => {
        SwalUtil.showAlert('Información', response.mensaje, 'success').then(
          () => {
            this.detallePedidoForm.reset();
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
    if (this.detallePedidoForm.invalid) {
      await SwalUtil.showAlert(
        'Información',
        'Complete los campos requeridos',
        'error'
      );
      return;
    }

    const detallePedido: ActualizaDetallePedidoRequest = {
      id: this.idDetallePedidoEditar ?? -1,
      cantidad: this.cantidad.value,
      valor: this.valor.value,
      pedidoId: this.pedido.value,
      productoId: this.producto.value,
    };

    this.detallePedidoService.actualizar(detallePedido).subscribe({
      next: (response) => {
        SwalUtil.showAlert('Información', response.mensaje, 'success').then(
          () => {
            this.detallePedidoForm.reset();
            this.idDetallePedidoEditar = null;
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
