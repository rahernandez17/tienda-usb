import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoriaService } from 'src/app/core/services/categoria/categoria.service';
import { Subject, takeUntil } from 'rxjs';
import {
  Categoria,
  GuardaCategoriaRequest,
} from 'src/app/core/interfaces/categoria/categoria.interface';
import { MatTableDataSource } from '@angular/material/table';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { SwalUtil } from 'src/app/core/utils/swal.util';
import { FormularioCategoriasComponent } from '../../components/formulario-categorias/formulario-categorias.component';
import { VerCategoriasComponent } from '../../components/ver-categorias/ver-categorias.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss'],
})
export class CategoriasComponent implements OnInit, OnDestroy {
  readonly listColumnas: string[] = ['id', 'nombre', 'descripcion', 'opciones'];

  private readonly destroy$: Subject<any> = new Subject();

  categorias: Categoria[] = [];

  dataSource: MatTableDataSource<Categoria> = new MatTableDataSource<Categoria>(
    []
  );

  constructor(
    private readonly categoriaService: CategoriaService,
    private readonly dialog: MatDialog
  ) {}

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

  verDetalle(categoriaId: number): void {
    this.dialog.open(VerCategoriasComponent, {
      data: { categoriaId },
    });
  }

  crearNuevo(): void {
    const dialogRef = this.dialog.open(FormularioCategoriasComponent, {
      width: '700px',
    });

    dialogRef.afterClosed().subscribe((result: Categoria) => {
      if (result) {
        this.categorias = [...this.categorias, result];
        this.dataSource = new MatTableDataSource(this.categorias);
      }
    });
  }

  editarCategoria(categoria: Categoria): void {
    const dialogRef = this.dialog.open(FormularioCategoriasComponent, {
      data: { categoria },
      width: '700px',
    });

    dialogRef.afterClosed().subscribe((result: Categoria) => {
      if (result) {
        this.categorias = this.categorias.map((categoria) =>
          categoria.id === result.id ? result : categoria
        );
        this.dataSource = new MatTableDataSource(this.categorias);
      }
    });
  }
}
