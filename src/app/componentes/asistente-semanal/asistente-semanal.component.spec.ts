import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsistenteSemanalComponent } from './asistente-semanal.component';

describe('AsistenteSemanalComponent', () => {
  let component: AsistenteSemanalComponent;
  let fixture: ComponentFixture<AsistenteSemanalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsistenteSemanalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsistenteSemanalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
