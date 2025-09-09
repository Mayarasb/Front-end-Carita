import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaAdministradorComponent } from './pagina-administrador.component';

describe('PaginaAdministradorComponent', () => {
  let component: PaginaAdministradorComponent;
  let fixture: ComponentFixture<PaginaAdministradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginaAdministradorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginaAdministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
