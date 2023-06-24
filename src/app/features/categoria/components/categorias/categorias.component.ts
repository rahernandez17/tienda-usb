import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoriaService } from 'src/app/core/services/categoria/categoria.service';
import { Subject, takeUntil } from 'rxjs';
import { Categoria } from 'src/app/core/interfaces/categoria/categoria.interface';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss'],
})
export class CategoriasComponent implements OnInit, OnDestroy {
  readonly listColumnas: string[] = ['id', 'nombre', 'descripcion', 'opciones'];

  private readonly destroy$: Subject<any> = new Subject();

  categorias: Categoria[] = [];

  categoria!: Categoria;

  dataSource: MatTableDataSource<Categoria> = new MatTableDataSource(
    [] as Categoria[]
  );

  constructor(private readonly categoriaService: CategoriaService) {}

  ngOnInit(): void {
    this.obtenerTodas();
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  obtenerTodas() {
    this.categoriaService
      .obtenerTodas()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.categorias = response.valor;
          this.dataSource = new MatTableDataSource(response.valor);
        },
      });
  }

  verDetalle(idCategoria: number): void {
    this.categoriaService
      .buscarPorId(idCategoria)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.categoria = response.valor;
          console.table(this.categoria);
        },
      });
  }
}
