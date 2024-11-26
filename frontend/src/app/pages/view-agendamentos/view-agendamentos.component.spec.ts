import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAgendamentosComponent } from './view-agendamentos.component';

describe('ViewAgendamentosComponent', () => {
  let component: ViewAgendamentosComponent;
  let fixture: ComponentFixture<ViewAgendamentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewAgendamentosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewAgendamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
