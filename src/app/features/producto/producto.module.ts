import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductoRoutingModule } from './producto-routing.module';
import { ProductosComponent } from './pages/productos/productos.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormularioProductosComponent } from './components/formulario-productos/formulario-productos.component';
import { VerProductosComponent } from './components/ver-productos/ver-productos.component';

@NgModule({
  declarations: [
    ProductosComponent,
    FormularioProductosComponent,
    VerProductosComponent,
  ],
  imports: [CommonModule, ProductoRoutingModule, SharedModule],
})
export class ProductoModule {}
