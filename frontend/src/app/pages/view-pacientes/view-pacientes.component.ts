//Tela de listagem dos pacientes
import { Component, OnInit } from '@angular/core';
import { ListaItemsComponent } from '../../components/lista-items/lista-items.component';
import { PacienteService } from '../../services/paciente.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  standalone: true,
  selector: 'app-view-pacientes',
  templateUrl: './view-pacientes.component.html',
  imports: [ListaItemsComponent, CommonModule, FormsModule],
})
export class ViewPacientesComponent implements OnInit {
  pacientes: any[] = [];
  columns = [
    { key: 'id', label: 'ID'},
    { key: 'nome', label: 'Nome' },
    { key: 'telefone', label: 'Telefone' },
    { key: 'cidade', label: 'Cidade' },
  ];

  constructor(private pacienteService: PacienteService, private router: Router) {}

  ngOnInit() {
    this.carregarPacientes();
  }

  carregarPacientes() {
    this.pacienteService.buscarPacientes().subscribe({
      next: (data) => {
        this.pacientes = data;
      },
      error: (error) => {
        console.error('Erro ao buscar pacientes:', error);
      }
    });
  }

  excluirPaciente(id: number) {
    if (confirm('Tem certeza de que deseja excluir este paciente?')) {
      this.pacienteService.deletarPaciente(id).subscribe({
        next: () => {
          alert('Paciente excluído com sucesso!');
          this.carregarPacientes();
        },
        error: (error) => {
          console.error('Erro ao excluir paciente:', error);
          alert('Não foi possível excluir o paciente. Tente novamente mais tarde.');
        }
      });
    }
  }
  irParaCadastroPaciente() {
    this.router.navigate(['/cadastropaciente']);
  }
}



