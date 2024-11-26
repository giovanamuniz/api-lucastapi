import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroAgendamentosComponent } from './cadastro-agendamentos.component';

describe('CadastroAgendamentosComponent', () => {
  let component: CadastroAgendamentosComponent;
  let fixture: ComponentFixture<CadastroAgendamentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroAgendamentosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CadastroAgendamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
