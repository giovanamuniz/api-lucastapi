import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AgendamentoService } from '../../services/agendamento.service';
import { HeaderComponent } from '../../components/header/header.component';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { CreateComponent } from '../../components/create/create.component';

@Component({
  selector: 'app-editar-agendamento',
  standalone: true,
  imports: [HeaderComponent, PrimaryInputComponent, ReactiveFormsModule, CreateComponent],
  templateUrl: './editar-agendamento.component.html',
  styleUrl: './editar-agendamento.component.scss'
})
export class EditarAgendamentoComponent implements OnInit {
  createForm!: FormGroup; 
  agendamentoId!: number; 

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private agendamentoService: AgendamentoService
  ) { }

  ngOnInit(): void {
    this.initForm(); 
    this.route.params.subscribe(params => {
      this.agendamentoId = Number(params['id']); 
      this.carregarDadosAgendamento();
    });
  }

  initForm(): void {
    this.createForm = this.fb.group({
      data: ['', Validators.required],
      horario: [''],
      tipo: [''],
      paciente_id: ['', Validators.required],
      profissional_id: [''],
    });
    
  }

  carregarDadosAgendamento(): void {
    this.agendamentoService.buscarAgendamento(this.agendamentoId).subscribe({
      next: (agendamento) => {
        this.createForm.patchValue(agendamento);
      },
      error: (err) => {
        console.error('Erro ao carregar agendamento', err);
        alert('Erro ao carregar os dados do agendamento. Tente novamente mais tarde.');
      },
    });
  }
  
  salvar(): void {
    if (this.createForm.valid) {
      this.agendamentoService.atualizarAgendamento(this.agendamentoId, this.createForm.value).subscribe({
        next: (response) => {
          console.log('Agendamento atualizado com sucesso!', response);
          alert('Agendamento atualizado com sucesso!');
          this.router.navigate(['/listaagendamentos']);
        },
        error: (err) => {
          console.error('Erro ao atualizar agendamento', err);
          alert('Erro ao atualizar os dados. Tente novamente mais tarde.');
        },
      });
    } else {
      alert('Preencha todos os campos obrigatórios antes de salvar.');
    }
  }
}  
