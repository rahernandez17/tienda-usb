import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioPedidosComponent } from './formulario-pedidos.component';

describe('FormularioPedidosComponent', () => {
  let component: FormularioPedidosComponent;
  let fixture: ComponentFixture<FormularioPedidosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormularioPedidosComponent]
    });
    fixture = TestBed.createComponent(FormularioPedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
