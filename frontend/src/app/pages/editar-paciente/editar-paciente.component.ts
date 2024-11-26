//Tela para edição de uma paciente
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PacienteService } from '../../services/paciente.service';
import { CreateComponent } from "../../components/create/create.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HeaderComponent } from '../../components/header/header.component';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';


@Component({
  standalone: true,
  selector: 'app-editar-paciente',
  templateUrl: './editar-paciente.component.html',
  styleUrls: ['./editar-paciente.component.scss'],
  imports: [ReactiveFormsModule, CreateComponent, HeaderComponent, PrimaryInputComponent],
})
export class EditarPacienteComponent implements OnInit {
  createForm!: FormGroup; 
  pacienteId!: number; 

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private pacienteService: PacienteService
  ) { }

  ngOnInit(): void {
    this.initForm(); 
    this.route.params.subscribe(params => {
      this.pacienteId = Number(params['id']); 
      this.carregarDadosPaciente();
    });
  }

  initForm(): void {
    this.createForm = this.fb.group({
      nome: ['', Validators.required],
      hospital_id: ['', Validators.required],
      medico_id: [''],
      cpf: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]], 
      genero: [''],
      data_nascimento: [''],
      telefone: ['', Validators.pattern(/^\d+$/)], 
      responsavel: [''],
      telefone_responsavel: [''],
      endereco: [''],
      cep: [''],
      cidade: [''],
      estado: [''],
    });
    
  }

  carregarDadosPaciente(): void {
    this.pacienteService.buscarPaciente(this.pacienteId).subscribe({
      next: (paciente) => {
        if (paciente.data_nascimento) {
          paciente.data_nascimento = paciente.data_nascimento.split('T')[0];
        }
        this.createForm.patchValue(paciente);
      },
      error: (err) => {
        console.error('Erro ao carregar paciente', err);
        alert('Erro ao carregar os dados do paciente. Tente novamente mais tarde.');
      },
    });
  }
  
  salvar(): void {
    const cleanData = { ...this.createForm.value };
    cleanData.telefone = cleanData.telefone.trim().replace(/\s+/g, '');
    if (this.createForm.valid) {
      this.pacienteService.atualizarPaciente(this.pacienteId, cleanData).subscribe({
        next: (response) => {
          console.log('Paciente atualizado com sucesso!', response);
          alert('Paciente atualizado com sucesso!');
          this.router.navigate(['/listapacientes']);
        },
        error: (err) => {
          console.error('Erro ao atualizar paciente', err);
          alert('Erro ao atualizar os dados. Tente novamente mais tarde.');
        },
      });
    } else {
      alert('Preencha todos os campos obrigatórios antes de salvar.');
    }
  }
}  