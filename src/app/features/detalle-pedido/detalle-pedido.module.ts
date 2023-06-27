import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetallePedidoRoutingModule } from './detalle-pedido-routing.module';
import { FormularioDetallesPedidosComponent } from './components/formulario-detalles-pedidos/formulario-detalles-pedidos.component';
import { VerDetallesPedidosComponent } from './components/ver-detalles-pedidos/ver-detalles-pedidos.component';
import { DetallesPedidosComponent } from './pages/detalles-pedidos/detalles-pedidos.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    FormularioDetallesPedidosComponent,
    VerDetallesPedidosComponent,
    DetallesPedidosComponent,
  ],
  imports: [CommonModule, DetallePedidoRoutingModule, SharedModule],
})
export class DetallePedidoModule {}
