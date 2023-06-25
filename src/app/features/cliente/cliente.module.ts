import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClienteRoutingModule } from './cliente-routing.module';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { VerClientesComponent } from './components/ver-clientes/ver-clientes.component';
import { FormularioClientesComponent } from './components/formulario-clientes/formulario-clientes.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    ClientesComponent,
    VerClientesComponent,
    FormularioClientesComponent,
  ],
  imports: [CommonModule, ClienteRoutingModule, SharedModule],
})
export class ClienteModule {}
