import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PedidosComponent } from './pages/pedidos/pedidos.component';

const routes: Routes = [
  {
    path: '',
    component: PedidosComponent,
    title: 'Pedidos',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PedidoRoutingModule { }
