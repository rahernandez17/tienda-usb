import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioCategoriasComponent } from './formulario-categorias.component';

describe('FormularioCategoriasComponent', () => {
  let component: FormularioCategoriasComponent;
  let fixture: ComponentFixture<FormularioCategoriasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormularioCategoriasComponent]
    });
    fixture = TestBed.createComponent(FormularioCategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
