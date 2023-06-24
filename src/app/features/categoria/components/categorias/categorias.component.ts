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

  dataSource: MatTableDataSource<Categoria> = new MatTableDataSource(
    [] as Categoria[]
  );

  constructor(private readonly categoriaService: CategoriaService) {}

  ngOnInit(): void {
    this.categoriaService
      .obtenerTodas()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.categorias = response.valor;
          this.dataSource = new MatTableDataSource(response.valor);
        },
        error: () => {
          this.categorias = [];
          this.dataSource = new MatTableDataSource([] as Categoria[]);
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}
