import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvaliacaoSiteComponent } from './avaliacao-site.component';

describe('AvaliacaoSiteComponent', () => {
  let component: AvaliacaoSiteComponent;
  let fixture: ComponentFixture<AvaliacaoSiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvaliacaoSiteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvaliacaoSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
