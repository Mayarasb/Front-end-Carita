import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcessibilidadeComponent } from './acessibilidade.component';

describe('AcessibilidadeComponent', () => {
  let component: AcessibilidadeComponent;
  let fixture: ComponentFixture<AcessibilidadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcessibilidadeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcessibilidadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
