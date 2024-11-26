//Tela para cadastro de um paciente
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HeaderComponent } from "../../components/header/header.component";
import { Router } from '@angular/router';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { CreateComponent } from "../../components/create/create.component";
import { CommonModule } from '@angular/common';
import { PacienteService } from '../../services/paciente.service';


@Component({
  selector: 'app-cadastro-paciente',
  standalone: true,
  imports: [ReactiveFormsModule,
    HeaderComponent, CreateComponent, PrimaryInputComponent, CommonModule],
  templateUrl: './cadastro-paciente.component.html',
  styleUrl: './cadastro-paciente.component.scss'
})
export class CadastroPacienteComponent {
  createForm!: FormGroup;
  

  constructor(private pacienteService: PacienteService, private router: Router) {
    this.createForm = new FormGroup({
      nome: new FormControl('', [Validators.required]),
      cpf: new FormControl('', [Validators.required]),
      genero: new FormControl('', [Validators.required]),
      data_nascimento: new FormControl('', [Validators.required]),
      telefone: new FormControl('', [Validators.required]),
      responsavel: new FormControl('', [Validators.required]),
      telefone_responsavel: new FormControl('', [Validators.required]),
      endereco: new FormControl('', [Validators.required]),
      cep: new FormControl('', [Validators.required]),
      cidade: new FormControl('', [Validators.required]),
      estado: new FormControl('', [Validators.required]),
      hospital_id: new FormControl ('', [Validators.required]), 
      profissional_id: new FormControl ('', [Validators.required])  
      
    });
  }
  submit() {
    console.log('Dados do formulário antes do envio:', this.createForm.value);
    if (this.createForm.valid) {
      console.log('Dados do formulário:', this.createForm.value); 
      this.pacienteService.cadastrarPaciente(this.createForm.value).subscribe({
        next: (response) => {
          console.log('Paciente cadastrado com sucesso:', response);
          this.router.navigate(['/listapacientes']); 
        },
        error: (error) => {
          console.error('Erro ao cadastrar paciente:', error);
        },
      });
    } else {
      console.log('Formulário inválido!');
    }
  }
  
}