import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetallesPedidosComponent } from './pages/detalles-pedidos/detalles-pedidos.component';

const routes: Routes = [
  {
    path: '',
    component: DetallesPedidosComponent,
    title: 'Detalles de pedidos',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetallePedidoRoutingModule { }
