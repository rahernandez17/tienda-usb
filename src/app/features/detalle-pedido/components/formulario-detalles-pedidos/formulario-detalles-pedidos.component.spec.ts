import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioDetallesPedidosComponent } from './formulario-detalles-pedidos.component';

describe('FormularioDetallesPedidosComponent', () => {
  let component: FormularioDetallesPedidosComponent;
  let fixture: ComponentFixture<FormularioDetallesPedidosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormularioDetallesPedidosComponent]
    });
    fixture = TestBed.createComponent(FormularioDetallesPedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
