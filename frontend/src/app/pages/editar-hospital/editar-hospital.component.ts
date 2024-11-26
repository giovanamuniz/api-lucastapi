import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HospitalService } from '../../services/hospital.service';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { HeaderComponent } from '../../components/header/header.component';
import { CreateComponent } from '../../components/create/create.component';

@Component({
  selector: 'app-editar-hospital',
  standalone: true,
  imports: [PrimaryInputComponent, HeaderComponent, CreateComponent, ReactiveFormsModule],
  templateUrl: './editar-hospital.component.html',
  styleUrl: './editar-hospital.component.scss'
})
export class EditarHospitalComponent implements OnInit {
  createForm!: FormGroup; 
  hospitalId!: number; 

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private hospitalService: HospitalService
  ) { }

  ngOnInit(): void {
    this.initForm(); 
    this.route.params.subscribe(params => {
      this.hospitalId = Number(params['id']); 
      this.carregarDadosHospital();
    });
  }

  initForm(): void {
    this.createForm = this.fb.group({
      nome: ['', Validators.required],
      cnpj: ['', [Validators.required]], 
      phone: ['', Validators.pattern(/^\d+$/)], 
      endereco: ['', Validators.required],
      postal_code: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      treatment: ['', Validators.required],
    });
  }

  carregarDadosHospital(): void {
    this.hospitalService.buscarHospital(this.hospitalId).subscribe({
      next: (hospital) => {
        console.log('Dados do hospital recebidos:', hospital);
        this.createForm.patchValue(hospital);
      },
      error: (err) => {
        console.error('Erro ao carregar hospital', err);
        alert('Erro ao carregar os dados do hospital. Tente novamente mais tarde.');
      },
    });
  }
  

  salvar(): void {
    const cleanData = { ...this.createForm.value };
    cleanData.telefone = cleanData.telefone.trim().replace(/\s+/g, '');
    if (this.createForm.valid) {
      console.log('Dados do formulário para envio:', cleanData);
      this.hospitalService.atualizarHospital(this.hospitalId, this.createForm.value).subscribe({
        next: (response) => {
          console.log('Hospital atualizado com sucesso!', response);
          alert('Hospital atualizado com sucesso!');
          this.router.navigate(['/listahospitais']);
        },
        error: (err) => {
          console.error('Erro ao atualizar hospital', err);
          alert('Erro ao atualizar os dados. Tente novamente mais tarde.');
        },
      });
    } else {
      alert('Preencha todos os campos obrigatórios antes de salvar.');
    }
  }
}