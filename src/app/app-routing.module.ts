import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriasComponent } from './features/categoria/components/categorias/categorias.component';

const routes: Routes = [
  {
    path: 'categorias',
    component: CategoriasComponent,
    title: 'Categorías',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
