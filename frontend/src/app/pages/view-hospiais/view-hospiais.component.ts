import { Component, OnInit } from '@angular/core';
import { ListaItemsComponent } from '../../components/lista-items/lista-items.component';
import { HospitalService } from '../../services/hospital.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-hospiais',
  standalone: true,
  imports: [ListaItemsComponent],
  templateUrl: './view-hospiais.component.html',
  styleUrl: './view-hospiais.component.scss'
})
export class ViewHospiaisComponent implements OnInit{
  hospitais: any [] = [];
  columns = [
    { key: 'id', label: 'ID'},
    { key: 'nome', label: 'Nome'},
    { key: 'phone', label: 'Telefone'},
    { key: 'city', label: 'Cidade'}
  ];

  constructor (private hospitalService: HospitalService, private router: Router) {}

  ngOnInit() {
    this.carregarHospitais();
  }

  carregarHospitais() {
    this.hospitalService.buscarHospitais().subscribe({
      next: (data) => {
        this.hospitais = data;
      },
      error: (error) => {
        console.error('Erro ao buscar hospitais: ', error);
      }
    })
  }

  excluirHospital(id: number) {
    if (confirm('Tem certeza de que deseja excluir este hospital?')) {
      this.hospitalService.deletarHospital(id).subscribe({
        next: () => {
          alert('Hospital excluído com sucesso!');
          this.carregarHospitais();
        },
        error: (error) => {
          console.error('Erro ao excluir hospital:', error);
          alert('Não foi possível excluir o hospital. Tente novamente mais tarde.');
        }
      });
    }
  }

  irParaCadastroHospital() {
    this.router.navigate(['/cadastrohospital']);
  }
}
