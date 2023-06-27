import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerDetallesPedidosComponent } from './ver-detalles-pedidos.component';

describe('VerDetallesPedidosComponent', () => {
  let component: VerDetallesPedidosComponent;
  let fixture: ComponentFixture<VerDetallesPedidosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerDetallesPedidosComponent]
    });
    fixture = TestBed.createComponent(VerDetallesPedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
