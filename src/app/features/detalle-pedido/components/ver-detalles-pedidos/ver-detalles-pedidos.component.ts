import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { DetallePedido } from 'src/app/core/interfaces/detalle-pedido/detalle-pedido.interface';
import { DetallePedidoService } from 'src/app/core/services/detalle-pedido/detalle-pedido.service';

@Component({
  selector: 'app-ver-detalles-pedidos',
  templateUrl: './ver-detalles-pedidos.component.html',
  styleUrls: ['./ver-detalles-pedidos.component.scss'],
})
export class VerDetallesPedidosComponent implements OnInit {
  private readonly destroy$: Subject<any> = new Subject();

  detallePedido!: DetallePedido;

  constructor(
    private readonly detallePedidoService: DetallePedidoService,
    @Inject(MAT_DIALOG_DATA) private readonly data: { detallePedidoId: number }
  ) {}

  ngOnInit(): void {
    this.verDetalle(this.data.detallePedidoId);
  }

  verDetalle(pedidoId: number): void {
    this.detallePedidoService
      .buscarPorId(pedidoId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => (this.detallePedido = response.valor),
      });
  }
}
