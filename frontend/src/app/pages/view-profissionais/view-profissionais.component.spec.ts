import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProfissionaisComponent } from './view-profissionais.component';

describe('ViewProfissionaisComponent', () => {
  let component: ViewProfissionaisComponent;
  let fixture: ComponentFixture<ViewProfissionaisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewProfissionaisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewProfissionaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
