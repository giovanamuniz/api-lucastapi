import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { CreateComponent } from "../../components/create/create.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProfissionalService } from '../../services/profissional.service';

@Component({
  selector: 'app-cadastro-profissionais',
  standalone: true,
  imports: [ReactiveFormsModule,
    HeaderComponent, CreateComponent, PrimaryInputComponent, CommonModule],
  templateUrl: './cadastro-profissionais.component.html',
  styleUrl: './cadastro-profissionais.component.scss'
})
export class CadastroProfissionaisComponent {
  createForm!: FormGroup;

  constructor(private router: Router, private profissionalService: ProfissionalService) {
    this.createForm = new FormGroup({
      nome: new FormControl('', [Validators.required]),
      cpf_cnpj: new FormControl('', [Validators.required]),
      especialidade: new FormControl('', [Validators.required]),
      telefone: new FormControl('', [Validators.required]),
      endereco: new FormControl('', [Validators.required]),
      cep: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]),
      cidade: new FormControl('', [Validators.required]),
      estado: new FormControl('', [Validators.required])
      
    });
  }
  submit() {
    if (this.createForm.valid) {
      console.log('Dados do formulário:', this.createForm.value); 
      this.profissionalService.cadastrarProfissional(this.createForm.value).subscribe({
        next: (response) => {
          console.log('Profissional cadastrado com sucesso:', response);
          this.router.navigate(['/listaprofissionais']); 
        },
        error: (error) => {
          console.error('Erro ao cadastrar profissional:', error);
        },
      });
    } else {
      console.log('Formulário inválido!');
    }
  }

}
