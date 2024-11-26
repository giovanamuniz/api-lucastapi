//Create component
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent {

  constructor (
    private router: Router
  ){

  }

  @Input() createBtn: string = "";
  @Input() cancelBtn: string = "";
  @Input() title: string = "";
  @Output("submit") onSubmit = new EventEmitter();
  @Output("navigate") onNavigate = new EventEmitter();
  @Input() routePath: string = '';

  submit(){
    this.onSubmit.emit();
  }

  navigate() {
    if (this.routePath) {
      this.router.navigate([this.routePath]); 
    }
  }

}
