import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PedidoRoutingModule } from './pedido-routing.module';
import { PedidosComponent } from './pages/pedidos/pedidos.component';
import { FormularioPedidosComponent } from './components/formulario-pedidos/formulario-pedidos.component';
import { VerPedidosComponent } from './components/ver-pedidos/ver-pedidos.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    PedidosComponent,
    FormularioPedidosComponent,
    VerPedidosComponent,
  ],
  imports: [CommonModule, PedidoRoutingModule, SharedModule],
})
export class PedidoModule {}
