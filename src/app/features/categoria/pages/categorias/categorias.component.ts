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

  idCategoriaEditar: number | null = null;

  dataSource: MatTableDataSource<Categoria> = new MatTableDataSource<Categoria>(
    []
  );

  categoriaForm!: FormGroup;

  isReadyForm!: Promise<any>;

  constructor(
    private readonly categoriaService: CategoriaService,
    private readonly formBuilder: FormBuilder
  ) {}

  get nombre(): FormControl {
    return this.categoriaForm.get('nombre') as FormControl;
  }

  get descripcion(): FormControl {
    return this.categoriaForm.get('descripcion') as FormControl;
  }

  ngOnInit(): void {
    this.iniciarFormulario();
    this.obtenerTodas();
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  iniciarFormulario(): void {
    this.isReadyForm = Promise.resolve(
      (this.categoriaForm = this.formBuilder.group({
        nombre: [null, [Validators.required]],
        descripcion: [null],
      }))
    );
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
          // this.categoria = response.valor;
          console.table(this.categoria);
        },
      });
  }

  seleccionarCategoriaEditar(categoria: Categoria): void {
    this.categoriaForm.patchValue({
      nombre: categoria.nombre,
      descripcion: categoria.descripcion,
    });
    this.idCategoriaEditar = categoria.id;
  }

  async guardar(): Promise<void> {
    if (this.categoriaForm.invalid) {
      await SwalUtil.showAlert(
        'Información',
        'Complete los campos requeridos',
        'error'
      );
      return;
    }

    const categoria: GuardaCategoriaRequest = {
      nombre: this.nombre.value,
      descripcion: this.descripcion.value,
    };

    this.categoriaService.guardar(categoria).subscribe({
      next: (response) => {
        SwalUtil.showAlert('Información', response.mensaje, 'success').then(
          () => this.obtenerTodas()
        );
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  async editar(): Promise<void> {
    if (this.categoriaForm.invalid) {
      await SwalUtil.showAlert(
        'Información',
        'Complete los campos requeridos',
        'error'
      );
      return;
    }

    const categoria: Categoria = {
      id: this.idCategoriaEditar ?? -1,
      nombre: this.nombre.value,
      descripcion: this.descripcion.value,
    };

    this.categoriaService.actualizar(categoria).subscribe({
      next: (response) => {
        SwalUtil.showAlert('Información', response.mensaje, 'success').then(
          () => {
            this.obtenerTodas();
            this.idCategoriaEditar = null;
          }
        );
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
