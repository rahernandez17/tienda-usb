import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriaRoutingModule } from './categoria-routing.module';
import { CategoriasComponent } from './pages/categorias/categorias.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { VerCategoriasComponent } from './components/ver-categorias/ver-categorias.component';
import { FormularioCategoriasComponent } from './components/formulario-categorias/formulario-categorias.component';

@NgModule({
  declarations: [
    CategoriasComponent,
    VerCategoriasComponent,
    FormularioCategoriasComponent,
  ],
  imports: [CommonModule, CategoriaRoutingModule, SharedModule],
})
export class CategoriaModule {}
