import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'categorias',
    loadChildren: () =>
      import('./features/categoria/categoria.module').then(
        (m) => m.CategoriaModule
      ),
  },
  {
    path: 'productos',
    loadChildren: () =>
      import('./features/producto/producto.module').then(
        (m) => m.ProductoModule
      ),
  },
  {
    path: 'clientes',
    loadChildren: () =>
      import('./features/cliente/cliente.module').then((m) => m.ClienteModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
