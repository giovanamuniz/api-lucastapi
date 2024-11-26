import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { CreateComponent } from '../../components/create/create.component';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { CommonModule } from '@angular/common';
import { AgendamentoService } from '../../services/agendamento.service';

@Component({
  selector: 'app-cadastro-agendamentos',
  standalone: true,
  imports: [HeaderComponent, CreateComponent, PrimaryInputComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './cadastro-agendamentos.component.html',
  styleUrl: './cadastro-agendamentos.component.scss'
})
export class CadastroAgendamentosComponent {
  createForm!: FormGroup;

  constructor(private router: Router, private agendamentoService: AgendamentoService) {
    this.createForm = new FormGroup({
      data: new FormControl('', [Validators.required]),
      horario: new FormControl('', [Validators.required]),
      tipo: new FormControl('', [Validators.required]),
      paciente_id: new FormControl ('', [Validators.required]), 
      profissional_id: new FormControl ('', [Validators.required])  
    });
  }
  submit() {
    console.log('Dados do formulário antes do envio:', this.createForm.value);
    if (this.createForm.valid) {
      console.log('Dados do formulário:', this.createForm.value); 
      this.agendamentoService.cadastrarAgendamento(this.createForm.value).subscribe({
        next: (response) => {
          console.log('Agendamento cadastrado com sucesso:', response);
          this.router.navigate(['/listaagendamentos']); 
        },
        error: (error) => {
          console.error('Erro ao cadastrar agendamento:', error);
        },
      });
    } else {
      console.log('Formulário inválido!');
    }
  }

}
