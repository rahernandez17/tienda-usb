import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Categoria } from 'src/app/core/interfaces/categoria/categoria.interface';
import { CategoriaService } from 'src/app/core/services/categoria/categoria.service';
import { ProductoService } from 'src/app/core/services/producto/producto.service';
import { Subject, takeUntil } from 'rxjs';
import {
  ActualizaProductoRequest,
  GuardaProductoRequest,
  Producto,
} from 'src/app/core/interfaces/producto/producto.interface';
import { SwalUtil } from 'src/app/core/utils/swal.util';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SimpleResponse } from 'src/app/core/interfaces/simple-response.interface';

@Component({
  selector: 'app-formulario-productos',
  templateUrl: './formulario-productos.component.html',
  styleUrls: ['./formulario-productos.component.scss'],
})
export class FormularioProductosComponent implements OnInit {
  private readonly destroy$: Subject<any> = new Subject();

  categorias: Categoria[] = [];

  idProductoEditar: number | null = null;

  productoForm!: FormGroup;

  isReadyForm!: Promise<any>;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly productoService: ProductoService,
    private readonly categoriaService: CategoriaService,
    private readonly dialogRef: MatDialogRef<FormularioProductosComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly data: { producto: Producto }
  ) {}

  get nombre(): FormControl {
    return this.productoForm.get('nombre') as FormControl;
  }

  get descripcion(): FormControl {
    return this.productoForm.get('descripcion') as FormControl;
  }

  get referencia(): FormControl {
    return this.productoForm.get('referencia') as FormControl;
  }

  get precioUnitario(): FormControl {
    return this.productoForm.get('precioUnitario') as FormControl;
  }

  get unidadesDisponibles(): FormControl {
    return this.productoForm.get('unidadesDisponibles') as FormControl;
  }

  get categoria(): FormControl {
    return this.productoForm.get('categoria') as FormControl;
  }

  ngOnInit(): void {
    this.obtenerCategorias();
    this.iniciarFormulario();
    this.seleccionarProductoEditar(this.data?.producto);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  iniciarFormulario(): void {
    this.isReadyForm = Promise.resolve(
      (this.productoForm = this.formBuilder.group({
        referencia: [null, [Validators.required]],
        nombre: [null, [Validators.required]],
        descripcion: [null],
        precioUnitario: [null, [Validators.required, Validators.min(1)]],
        unidadesDisponibles: [null, [Validators.required, Validators.min(1)]],
        categoria: [null, [Validators.required]],
      }))
    );
  }

  seleccionarProductoEditar(producto: Producto): void {
    if (producto) {
      this.productoForm.patchValue({
        nombre: producto.nombre,
        descripcion: producto.descripcion,
        referencia: producto.referencia,
        precioUnitario: producto.precioUnitario,
        unidadesDisponibles: producto.unidadesDisponibles,
        categoria: producto.categoriaId,
      });
      this.idProductoEditar = producto.id;
    }
  }

  obtenerCategorias() {
    this.categoriaService
      .obtenerTodas()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => (this.categorias = response.valor),
      });
  }

  async guardar(): Promise<void> {
    if (this.productoForm.invalid) {
      await SwalUtil.showAlert(
        'Información',
        'Complete los campos requeridos',
        'error'
      );
      return;
    }

    const producto: GuardaProductoRequest = {
      nombre: this.nombre.value,
      descripcion: this.descripcion.value,
      referencia: this.referencia.value,
      categoriaId: this.categoria.value,
      precioUnitario: this.precioUnitario.value,
      unidadesDisponibles: this.unidadesDisponibles.value,
    };

    this.productoService.guardar(producto).subscribe({
      next: (response) => {
        SwalUtil.showAlert('Información', response.mensaje, 'success').then(
          () => {
            this.productoForm.reset();
            this.dialogRef.close(response.valor);
          }
        );
      },
      error: (error: SimpleResponse<any>) => {
        SwalUtil.showAlert('Información', error.mensaje, 'error');
        console.log(error);
      },
    });
  }

  async editar(): Promise<void> {
    if (this.productoForm.invalid) {
      await SwalUtil.showAlert(
        'Información',
        'Complete los campos requeridos',
        'error'
      );
      return;
    }

    const producto: ActualizaProductoRequest = {
      id: this.idProductoEditar ?? -1,
      nombre: this.nombre.value,
      descripcion: this.descripcion.value,
      referencia: this.referencia.value,
      categoriaId: this.categoria.value,
      precioUnitario: this.precioUnitario.value,
      unidadesDisponibles: this.unidadesDisponibles.value,
    };

    this.productoService.actualizar(producto).subscribe({
      next: (response) => {
        SwalUtil.showAlert('Información', response.mensaje, 'success').then(
          () => {
            this.productoForm.reset();
            this.idProductoEditar = null;
            this.dialogRef.close(response.valor);
          }
        );
      },
      error: (error: SimpleResponse<any>) => {
        SwalUtil.showAlert('Información', error.mensaje, 'error');
        console.log(error);
      },
    });
  }
}
