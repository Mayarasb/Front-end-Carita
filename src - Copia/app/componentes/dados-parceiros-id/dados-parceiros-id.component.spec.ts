import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DadosParceirosIdComponent } from './dados-parceiros-id.component';

describe('DadosParceirosIdComponent', () => {
  let component: DadosParceirosIdComponent;
  let fixture: ComponentFixture<DadosParceirosIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DadosParceirosIdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DadosParceirosIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
