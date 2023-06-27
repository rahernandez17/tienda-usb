import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import { Cliente } from 'src/app/core/interfaces/cliente/cliente.interface';
import { ClienteService } from 'src/app/core/services/cliente/cliente.service';
import { VerClientesComponent } from '../../components/ver-clientes/ver-clientes.component';
import { FormularioClientesComponent } from '../../components/formulario-clientes/formulario-clientes.component';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss'],
})
export class ClientesComponent implements OnInit, OnDestroy {
  readonly listColumnas: string[] = [
    'id',
    'nombres',
    'apellidos',
    'estado',
    'documento',
    'tipoDocumento',
    'opciones',
  ];

  private readonly destroy$: Subject<any> = new Subject();

  clientes: Cliente[] = [];

  dataSource: MatTableDataSource<Cliente> = new MatTableDataSource<Cliente>([]);

  constructor(
    private readonly clienteService: ClienteService,
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
    this.clienteService
      .obtenerTodos()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.clientes = response.valor;
          this.dataSource = new MatTableDataSource(response.valor);
        },
      });
  }

  verDetalle(clienteId: number): void {
    this.dialog.open(VerClientesComponent, {
      data: { clienteId },
    });
  }

  crearNuevo(): void {
    const dialogRef = this.dialog.open(FormularioClientesComponent, {
      width: '700px',
    });

    dialogRef.afterClosed().subscribe((result: Cliente) => {
      if (result) {
        this.clientes = [...this.clientes, result];
        this.dataSource = new MatTableDataSource(this.clientes);
      }
    });
  }

  editarCliente(cliente: Cliente): void {
    const dialogRef = this.dialog.open(FormularioClientesComponent, {
      data: { cliente },
      width: '700px',
    });

    dialogRef.afterClosed().subscribe((result: Cliente) => {
      if (result) {
        this.clientes = this.clientes.map((cliente) =>
          cliente.id === result.id ? result : cliente
        );
        this.dataSource = new MatTableDataSource(this.clientes);
      }
    });
  }
}
