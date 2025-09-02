import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DadosInstituicaoIdComponent } from './dados-instituicao-id.component';

describe('DadosInstituicaoIdComponent', () => {
  let component: DadosInstituicaoIdComponent;
  let fixture: ComponentFixture<DadosInstituicaoIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DadosInstituicaoIdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DadosInstituicaoIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
