import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { CreateComponent } from "../../components/create/create.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryInputComponent } from "../../components/primary-input/primary-input.component";
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HospitalService } from '../../services/hospital.service';

@Component({
  selector: 'app-cadastro-hospital',
  standalone: true,
  imports: [HeaderComponent, CreateComponent, PrimaryInputComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './cadastro-hospital.component.html',
  styleUrl: './cadastro-hospital.component.scss'
})
export class CadastroHospitalComponent {
  createForm!: FormGroup;

  constructor(private hospitalService: HospitalService, private router: Router) {
    this.createForm = new FormGroup({
      nome: new FormControl('', [Validators.required]),
      cnpj: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      endereco: new FormControl('', [Validators.required]),
      postal_code: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      treatment: new FormControl('', [Validators.required])
      
    });
  }
  submit() {
    if (this.createForm.valid) {
      console.log('Dados do formulário:', this.createForm.value); 
      this.hospitalService.cadastrarHospital(this.createForm.value).subscribe({
        next: (response) => {
          console.log('Hospital cadastrado com sucesso:', response);
          this.router.navigate(['/listahospitais']);
        },
        error: (error) => {
          console.error('Erro ao cadastrar hospital:', error);
        },
      });
    } else {
      console.log('Formulário inválido!');
    }
  }

}
