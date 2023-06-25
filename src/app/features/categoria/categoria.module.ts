import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriaRoutingModule } from './categoria-routing.module';
import { CategoriasComponent } from './pages/categorias/categorias.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [CategoriasComponent],
  imports: [CommonModule, CategoriaRoutingModule, SharedModule],
})
export class CategoriaModule {}
