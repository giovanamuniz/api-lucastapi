import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarHospitalComponent } from './editar-hospital.component';

describe('EditarHospitalComponent', () => {
  let component: EditarHospitalComponent;
  let fixture: ComponentFixture<EditarHospitalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarHospitalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarHospitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
