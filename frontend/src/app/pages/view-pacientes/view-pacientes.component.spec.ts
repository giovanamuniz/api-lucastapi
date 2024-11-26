import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPacientesComponent } from './view-pacientes.component';

describe('ViewPacientesComponent', () => {
  let component: ViewPacientesComponent;
  let fixture: ComponentFixture<ViewPacientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewPacientesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewPacientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
