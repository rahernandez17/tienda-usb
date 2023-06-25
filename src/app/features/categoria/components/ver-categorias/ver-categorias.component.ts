import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Categoria } from 'src/app/core/interfaces/categoria/categoria.interface';
import { CategoriaService } from 'src/app/core/services/categoria/categoria.service';
import { takeUntil, Subject } from 'rxjs';

@Component({
  selector: 'app-ver-categorias',
  templateUrl: './ver-categorias.component.html',
  styleUrls: ['./ver-categorias.component.scss'],
})
export class VerCategoriasComponent implements OnInit {
  private readonly destroy$: Subject<any> = new Subject();

  categoria!: Categoria;

  constructor(
    private readonly categoriaService: CategoriaService,
    @Inject(MAT_DIALOG_DATA) private readonly data: { categoriaId: number }
  ) {}

  ngOnInit(): void {
    this.verDetalle(this.data.categoriaId);
  }

  verDetalle(categoriaId: number): void {
    this.categoriaService
      .buscarPorId(categoriaId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => (this.categoria = response.valor),
      });
  }
}
