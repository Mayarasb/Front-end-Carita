import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaOrganizacoesComponent } from './lista-organizacoes.component';

describe('ListaOrganizacoesComponent', () => {
  let component: ListaOrganizacoesComponent;
  let fixture: ComponentFixture<ListaOrganizacoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaOrganizacoesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaOrganizacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
