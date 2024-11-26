import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registrar',
  standalone: true,
  imports: [ 
    ReactiveFormsModule,
    RouterModule, CommonModule
  ],
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.scss'] 
})
export class RegistrarComponent {
  funcionarioForm: FormGroup;
  mensagem: string | null = null;
  sucesso: boolean = false;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.funcionarioForm = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required],
      telefone: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.funcionarioForm.valid) {
      const funcionario = this.funcionarioForm.value;
      this.http.post('http://localhost:4040/auth/register', funcionario).subscribe({
        next: () => {
          this.mensagem = 'Usuário cadastrado com sucesso!';
          this.sucesso = true;
          this.funcionarioForm.reset();
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000); 
        },
        error: () => {
          this.mensagem = 'Erro ao cadastrar usuário.';
          this.sucesso = false;
        },
      });
    }
  }
  navigate(){
    this.router.navigate(["/login"])
  }
}