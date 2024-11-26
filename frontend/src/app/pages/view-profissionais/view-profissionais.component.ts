import { Component, OnInit } from '@angular/core';
import { ListaItemsComponent } from '../../components/lista-items/lista-items.component';
import { ProfissionalService } from '../../services/profissional.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-profissionais',
  standalone: true,
  imports: [ListaItemsComponent],
  templateUrl: './view-profissionais.component.html',
  styleUrl: './view-profissionais.component.scss'
})
export class ViewProfissionaisComponent implements OnInit {
  profissionais: any[] = [];
  columns = [
    { key: 'id', label: 'ID'},
    { key: 'nome', label: 'Nome' },
    { key: 'telefone', label: 'Telefone' },
    { key: 'cidade', label: 'Cidade' },
  ];

  constructor(private profissionalService: ProfissionalService, private router: Router) {}

  ngOnInit() {
    this.carregarProfissionais();
  }

  carregarProfissionais() {
    this.profissionalService.buscarProfissionais().subscribe({
      next: (data) => {
        this.profissionais = data;
      },
      error: (error) => {
        console.error('Erro ao buscar profissionais:', error);
      }
    });
  }

  excluirProfissional(id: number) {
    if (confirm('Tem certeza de que deseja excluir este profissional?')) {
      this.profissionalService.deletarProfissional(id).subscribe({
        next: () => {
          alert('Profissional excluído com sucesso!');
          this.carregarProfissionais();
        },
        error: (error) => {
          console.error('Erro ao excluir profissional:', error);
          alert('Não foi possível excluir o profissional. Tente novamente mais tarde.');
        }
      });
    }
  }
  irParaCadastroProfissional() {
    this.router.navigate(['/cadastroprofissionais']);
  }
}
