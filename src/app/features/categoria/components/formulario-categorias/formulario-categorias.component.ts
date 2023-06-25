import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  Categoria,
  GuardaCategoriaRequest,
} from 'src/app/core/interfaces/categoria/categoria.interface';
import { SimpleResponse } from 'src/app/core/interfaces/simple-response.interface';
import { CategoriaService } from 'src/app/core/services/categoria/categoria.service';
import { SwalUtil } from 'src/app/core/utils/swal.util';

@Component({
  selector: 'app-formulario-categorias',
  templateUrl: './formulario-categorias.component.html',
  styleUrls: ['./formulario-categorias.component.scss'],
})
export class FormularioCategoriasComponent implements OnInit {
  idCategoriaEditar: number | null = null;

  categoriaForm!: FormGroup;

  isReadyForm!: Promise<any>;

  constructor(
    private readonly categoriaService: CategoriaService,
    private readonly formBuilder: FormBuilder,
    private readonly dialogRef: MatDialogRef<FormularioCategoriasComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly data: { categoria: Categoria }
  ) {}

  get nombre(): FormControl {
    return this.categoriaForm.get('nombre') as FormControl;
  }

  get descripcion(): FormControl {
    return this.categoriaForm.get('descripcion') as FormControl;
  }

  ngOnInit(): void {
    this.iniciarFormulario();
    this.seleccionarCategoriaEditar(this.data?.categoria);
  }

  iniciarFormulario(): void {
    this.isReadyForm = Promise.resolve(
      (this.categoriaForm = this.formBuilder.group({
        nombre: [null, [Validators.required]],
        descripcion: [null],
      }))
    );
  }

  seleccionarCategoriaEditar(categoria: Categoria): void {
    if (categoria) {
      this.categoriaForm.patchValue({
        nombre: categoria.nombre,
        descripcion: categoria.descripcion,
      });
      this.idCategoriaEditar = categoria.id;
    }
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
          () => {
            this.categoriaForm.reset();
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
            this.categoriaForm.reset();
            this.idCategoriaEditar = null;
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
