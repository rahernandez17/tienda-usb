import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import { Pedido } from 'src/app/core/interfaces/pedido/pedido.interface';
import { PedidoService } from 'src/app/core/services/pedido/pedido.service';
import { VerPedidosComponent } from '../../components/ver-pedidos/ver-pedidos.component';
import { FormularioPedidosComponent } from '../../components/formulario-pedidos/formulario-pedidos.component';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss'],
})
export class PedidosComponent implements OnInit, OnDestroy {
  readonly listColumnas: string[] = [
    'id',
    'fecha',
    'total',
    'cliente',
    'estadoPedido',
    'opciones',
  ];

  private readonly destroy$: Subject<any> = new Subject();

  dataSource: MatTableDataSource<Pedido> = new MatTableDataSource<Pedido>([]);

  pedidos: Pedido[] = [];

  constructor(
    private readonly pedidoService: PedidoService,
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
    this.pedidoService
      .obtenerTodos()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.pedidos = response.valor;
          this.dataSource = new MatTableDataSource(this.pedidos);
        },
      });
  }

  verDetalle(pedidoId: number): void {
    this.dialog.open(VerPedidosComponent, {
      data: { pedidoId },
    });
  }

  crearNuevo(): void {
    const dialogRef = this.dialog.open(FormularioPedidosComponent, {
      width: '700px',
    });

    dialogRef.afterClosed().subscribe((result: Pedido) => {
      if (result) {
        this.pedidos = [...this.pedidos, result];
        this.dataSource = new MatTableDataSource(this.pedidos);
      }
    });
  }

  editarPedido(pedido: Pedido): void {
    const dialogRef = this.dialog.open(FormularioPedidosComponent, {
      data: { pedido },
      width: '700px',
    });

    dialogRef.afterClosed().subscribe((result: Pedido) => {
      if (result) {
        this.pedidos = this.pedidos.map((pedido) =>
          pedido.id === result.id ? result : pedido
        );
        this.dataSource = new MatTableDataSource(this.pedidos);
      }
    });
  }
}
