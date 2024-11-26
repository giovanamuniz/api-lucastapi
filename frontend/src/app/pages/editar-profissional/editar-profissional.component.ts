import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfissionalService } from '../../services/profissional.service';
import { CreateComponent } from '../../components/create/create.component';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-editar-profissional',
  standalone: true,
  imports: [ReactiveFormsModule, CreateComponent, PrimaryInputComponent, HeaderComponent],
  templateUrl: './editar-profissional.component.html',
  styleUrl: './editar-profissional.component.scss'
})
export class EditarProfissionalComponent implements OnInit {
  createForm!: FormGroup; 
  profissionalId!: number; 

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private profissionalService: ProfissionalService
  ) { }

  ngOnInit(): void {
    this.initForm(); 
    this.route.params.subscribe(params => {
      this.profissionalId = Number(params['id']); 
      this.carregarDadosProfissional();
    });
  }

  initForm(): void {
    this.createForm = this.fb.group({
      nome: ['', Validators.required],
      cpf_cnpj: ['', Validators.required],
      telefone: ['', Validators.required],
      especialidade: ['', Validators.required],
      endereco: ['', Validators.required],
      cep: ['', Validators.required],
      cidade: ['', Validators.required],
      estado: ['', Validators.required],
    });
    
  }

  carregarDadosProfissional(): void {
    this.profissionalService.buscarProfissional(this.profissionalId).subscribe({
      next: (profissional) => {
        console.log('Dados do profissional retornados do backend:', profissional);
        this.createForm.patchValue(profissional);
      },
      error: (err) => {
        console.error('Erro ao buscar profissional:', err);
      },
    });
    
  }
  
  salvar(): void {
    const cleanData = { ...this.createForm.value };
    cleanData.telefone = cleanData.telefone.trim().replace(/\s+/g, '');
  
    if (this.createForm.valid) {
      this.profissionalService.atualizarProfissional(this.profissionalId, cleanData).subscribe({
        next: () => {
          alert('Profissional atualizado com sucesso!');
          this.router.navigate(['/listaprofissionais']);
        },
        error: (err) => {
          console.error('Erro ao atualizar profissional', err);
          alert('Erro ao atualizar os dados. Tente novamente mais tarde.');
        },
      });
    } else {
      alert('Preencha todos os campos obrigatórios antes de salvar.');
    }
  }
}
