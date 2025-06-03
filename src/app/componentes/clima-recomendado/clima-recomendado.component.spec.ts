import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClimaRecomendadoComponent } from './clima-recomendado.component';

describe('ClimaRecomendadoComponent', () => {
  let component: ClimaRecomendadoComponent;
  let fixture: ComponentFixture<ClimaRecomendadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClimaRecomendadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClimaRecomendadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
