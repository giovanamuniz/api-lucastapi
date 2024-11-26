import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  mensagem: string | null = null;
  sucesso: boolean = false;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const credenciais = this.loginForm.value;
      this.http.post<{ token: string, funcionarioId: number }>('http://localhost:4040/auth/login', credenciais).subscribe({
        next: (response) => {
          const { token, funcionarioId } = response; 
          console.log('Token JWT:', token);
          console.log('Funcionário ID:', funcionarioId);
          localStorage.setItem('token', token);
          localStorage.setItem('funcionarioId', String(funcionarioId));
          
          this.mensagem = 'Login realizado com sucesso!';
          this.sucesso = true;
          this.router.navigate(['/cards']);
        },
        error: () => {
          this.mensagem = 'Credenciais inválidas ou erro no login.';
          this.sucesso = false;
        },
      });
    }
  }
  navigate(){
    this.router.navigate(["/registrar"])
  }

  limparMensagem(): void {
    setTimeout(() => {
      this.mensagem = null;
    }, 3000); 
  }
}
