import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { Pedido } from 'src/app/core/interfaces/pedido/pedido.interface';
import { PedidoService } from 'src/app/core/services/pedido/pedido.service';

@Component({
  selector: 'app-ver-pedidos',
  templateUrl: './ver-pedidos.component.html',
  styleUrls: ['./ver-pedidos.component.scss'],
})
export class VerPedidosComponent implements OnInit {
  private readonly destroy$: Subject<any> = new Subject();

  pedido!: Pedido;

  constructor(
    private readonly pedidoService: PedidoService,
    @Inject(MAT_DIALOG_DATA) private readonly data: { pedidoId: number }
  ) {}

  ngOnInit(): void {
    this.verDetalle(this.data.pedidoId);
  }

  verDetalle(pedidoId: number): void {
    this.pedidoService
      .buscarPorId(pedidoId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => (this.pedido = response.valor),
      });
  }
}
