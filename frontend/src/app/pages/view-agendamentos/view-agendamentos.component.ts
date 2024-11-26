import { Component, OnInit } from '@angular/core';
import { ListaItemsComponent } from '../../components/lista-items/lista-items.component';
import { AgendamentoService } from '../../services/agendamento.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Agendamento } from '../../interfaces/agendamento.model';


@Component({
  selector: 'app-view-agendamentos',
  standalone: true,
  imports: [ListaItemsComponent, CommonModule],
  templateUrl: './view-agendamentos.component.html',
  styleUrl: './view-agendamentos.component.scss'
})
export class ViewAgendamentosComponent implements OnInit {
  agendamentos: Agendamento[] = []; 
  columns = [
    { key: 'id', label: 'ID'},
    { key: 'data', label: 'Data' },
    { key: 'horario', label: 'Horario' },
    { key: 'tipo', label: 'Tipo de Consulta' },
  ];

  constructor(private agendamentoService: AgendamentoService, private router: Router) {}

  ngOnInit() {
    this.carregarAgendamentos();
  }

  carregarAgendamentos() {
    this.agendamentoService.buscarAgendamentos().subscribe({
      next: (data) => {
        this.agendamentos = data.map((agendamento: any) => ({
          ...agendamento,
          data: agendamento.data ? new Date(agendamento.data).toLocaleDateString('pt-BR') : ''
        }));
        
      },
      error: (error) => {
        console.error('Erro ao buscar agendamentos:', error);
      }
    });
  }
  
  

  excluirAgendamento(id: number) {
    if (confirm('Tem certeza de que deseja excluir este agendamento?')) {
      this.agendamentoService.deletarAgendamento(id).subscribe({
        next: () => {
          alert('Agendamento excluído com sucesso!');
          this.carregarAgendamentos();
        },
        error: (error) => {
          console.error('Erro ao excluir agendamento:', error);
          alert('Não foi possível excluir o agendamento. Tente novamente mais tarde.');
        }
      });
    }
  }
  irParaCadastroAgendamento() {
    this.router.navigate(['/cadastroagendamento']);
  }
}

