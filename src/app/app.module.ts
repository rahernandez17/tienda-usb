import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CategoriaModule } from './features/categoria/categoria.module';
import { ProductoModule } from './features/producto/producto.module';
import { ClienteModule } from './features/cliente/cliente.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CategoriaModule,
    ProductoModule,
    ClienteModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
