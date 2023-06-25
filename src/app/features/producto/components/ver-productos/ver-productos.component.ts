import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { Producto } from 'src/app/core/interfaces/producto/producto.interface';
import { ProductoService } from 'src/app/core/services/producto/producto.service';

@Component({
  selector: 'app-ver-productos',
  templateUrl: './ver-productos.component.html',
  styleUrls: ['./ver-productos.component.scss'],
})
export class VerProductosComponent implements OnInit {
  private readonly destroy$: Subject<any> = new Subject();

  producto!: Producto;

  constructor(
    private readonly productoService: ProductoService,
    @Inject(MAT_DIALOG_DATA) private readonly data: { productoId: number }
  ) {}

  ngOnInit(): void {
    this.verDetalle(this.data.productoId);
  }

  verDetalle(idProducto: number): void {
    this.productoService
      .buscarPorId(idProducto)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => (this.producto = response.valor),
      });
  }
}
