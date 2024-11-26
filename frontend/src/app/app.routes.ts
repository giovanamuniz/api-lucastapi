import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegistrarComponent } from './pages/registrar/registrar.component';
import { LoginComponent } from './pages/login/login.component';
import { CadastroPacienteComponent } from './pages/cadastro-paciente/cadastro-paciente.component';
import { CardsComponent } from './pages/cards/cards.component';
import { CadastroHospitalComponent } from './pages/cadastro-hospital/cadastro-hospital.component';
import { CadastroProfissionaisComponent } from './pages/cadastro-profissionais/cadastro-profissionais.component';
import { ViewPacientesComponent } from './pages/view-pacientes/view-pacientes.component';
import { CadastroAgendamentosComponent } from './pages/cadastro-agendamentos/cadastro-agendamentos.component';
import { ViewProfissionaisComponent } from './pages/view-profissionais/view-profissionais.component';
import { ViewHospiaisComponent } from './pages/view-hospiais/view-hospiais.component';
import { ViewAgendamentosComponent } from './pages/view-agendamentos/view-agendamentos.component';
import { EditarPacienteComponent } from './pages/editar-paciente/editar-paciente.component';
import { EditarHospitalComponent } from './pages/editar-hospital/editar-hospital.component';
import { EditarProfissionalComponent } from './pages/editar-profissional/editar-profissional.component';
import { EditarAgendamentoComponent } from './pages/editar-agendamento/editar-agendamento.component';




export const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "registrar",
    component: RegistrarComponent
  },
  {
    path: "cadastropaciente",
    component: CadastroPacienteComponent
  },
  {
    path: 'editar-paciente/:id',
    component: EditarPacienteComponent
  },
  {
    path: 'editar-hospital/:id',
    component: EditarHospitalComponent
  },
  {
    path: 'editar-profissional/:id',
    component: EditarProfissionalComponent
  },
  {
    path: 'editar-agendamento/:id',
    component: EditarAgendamentoComponent
  },
  {
    path: "cards",
    component: CardsComponent
  },
  {
    path: "cadastrohospital",
    component: CadastroHospitalComponent
  },
  {
    path: "cadastroprofissionais",
    component: CadastroProfissionaisComponent
  },
  {
    path: "listapacientes",
    component: ViewPacientesComponent
  },
  {
    path: "cadastroagendamento",
    component: CadastroAgendamentosComponent
  },
  {
    path: "listaprofissionais",
    component: ViewProfissionaisComponent
  },
  {
    path: "listaagendamentos",
    component: ViewAgendamentosComponent
  },
  {
    path: "listahospitais",
    component: ViewHospiaisComponent
  },
  {
    path: '', redirectTo: '/login', pathMatch: 'full'
  }, 
  {
    path: '**', redirectTo: '/login'
  } 

];


