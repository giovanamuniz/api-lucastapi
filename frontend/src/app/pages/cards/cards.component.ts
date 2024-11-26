import { Component, EventEmitter, Output } from '@angular/core';
import { CardComponent } from "../../components/card/card.component";
import { Router } from '@angular/router';
import { HeaderComponent } from "../../components/header/header.component";

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CardComponent, HeaderComponent],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss'
})
export class CardsComponent {
  constructor(
    private router: Router
  ){
   
  }
  @Output("navigate") onNavigate = new EventEmitter();

  navigateHospitais(){
    this.router.navigate(["/listahospitais"])
  }
  navigateProfissionais(){
    this.router.navigate(["/listaprofissionais"])
  }
  navigatePacientes(){
    this.router.navigate(["/listapacientes"])
  }
  navigateAgendamentos(){
    this.router.navigate(["/listaagendamentos"])
  }
}
