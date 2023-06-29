import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import { DetallePedido } from 'src/app/core/interfaces/detalle-pedido/detalle-pedido.interface';
import { DetallePedidoService } from 'src/app/core/services/detalle-pedido/detalle-pedido.service';
import { VerDetallesPedidosComponent } from '../../components/ver-detalles-pedidos/ver-detalles-pedidos.component';
import { FormularioDetallesPedidosComponent } from '../../components/formulario-detalles-pedidos/formulario-detalles-pedidos.component';

@Component({
  selector: 'app-detalles-pedidos',
  templateUrl: './detalles-pedidos.component.html',
  styleUrls: ['./detalles-pedidos.component.scss'],
})
export class DetallesPedidosComponent implements OnInit, OnDestroy {
  readonly listColumnas: string[] = [
    'id',
    'cantidad',
    'valor',
    'pedido',
    'producto',
    'opciones',
  ];

  private readonly destroy$: Subject<any> = new Subject();

  dataSource: MatTableDataSource<DetallePedido> =
    new MatTableDataSource<DetallePedido>([]);

  detallesPedidos: DetallePedido[] = [];

  constructor(
    private readonly detallePedidoService: DetallePedidoService,
    private readonly dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.obtenerTodos();
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  obtenerTodos() {
    this.detallePedidoService
      .obtenerTodos()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.detallesPedidos = response.valor;
          this.dataSource = new MatTableDataSource(this.detallesPedidos);
        },
      });
  }

  verDetalle(detallePedidoId: number): void {
    this.dialog.open(VerDetallesPedidosComponent, {
      data: { detallePedidoId },
    });
  }

  crearNuevo(): void {
    const dialogRef = this.dialog.open(FormularioDetallesPedidosComponent, {
      width: '700px',
    });

    dialogRef.afterClosed().subscribe((result: DetallePedido) => {
      if (result) {
        this.detallesPedidos = [...this.detallesPedidos, result];
        this.dataSource = new MatTableDataSource(this.detallesPedidos);
      }
    });
  }

  editarDetallePedido(detallePedido: DetallePedido): void {
    const dialogRef = this.dialog.open(FormularioDetallesPedidosComponent, {
      data: { detallePedido },
      width: '700px',
    });

    dialogRef.afterClosed().subscribe((result: DetallePedido) => {
      if (result) {
        this.detallesPedidos = this.detallesPedidos.map((detallePedido) =>
          detallePedido.id === result.id ? result : detallePedido
        );
        this.dataSource = new MatTableDataSource(this.detallesPedidos);
      }
    });
  }
}
