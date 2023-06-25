import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import { Producto } from 'src/app/core/interfaces/producto/producto.interface';
import { ProductoService } from 'src/app/core/services/producto/producto.service';
import { FormularioProductosComponent } from '../../components/formulario-productos/formulario-productos.component';
import { VerProductosComponent } from '../../components/ver-productos/ver-productos.component';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss'],
})
export class ProductosComponent {
  readonly listColumnas: string[] = [
    'id',
    'nombre',
    'referencia',
    'descripcion',
    'precioUnitario',
    'unidadesDisponibles',
    'categoria',
    'opciones',
  ];

  private readonly destroy$: Subject<any> = new Subject();

  dataSource: MatTableDataSource<Producto> = new MatTableDataSource<Producto>(
    []
  );

  productos: Producto[] = [];

  constructor(
    private readonly productoService: ProductoService,
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
    this.productoService
      .obtenerTodos()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.productos = response.valor;
          this.dataSource = new MatTableDataSource(this.productos);
        },
      });
  }

  verDetalle(productoId: number): void {
    this.dialog.open(VerProductosComponent, {
      data: { productoId },
    });
  }

  crearNuevo(): void {
    const dialogRef = this.dialog.open(FormularioProductosComponent, {
      width: '700px',
    });

    dialogRef.afterClosed().subscribe((result: Producto) => {
      if (result) {
        console.log('Crear', result);
        this.productos = [...this.productos, result];
        this.dataSource = new MatTableDataSource(this.productos);
      }
    });
  }

  editarProducto(producto: Producto): void {
    const dialogRef = this.dialog.open(FormularioProductosComponent, {
      data: { producto },
      width: '700px',
    });

    dialogRef.afterClosed().subscribe((result: Producto) => {
      if (result) {
        this.productos = this.productos.map((producto) =>
          producto.id === result.id ? result : producto
        );
        this.dataSource = new MatTableDataSource(this.productos);
      }
    });
  }
}
