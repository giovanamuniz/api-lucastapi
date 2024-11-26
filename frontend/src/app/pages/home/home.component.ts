import { Component, Output, EventEmitter } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { LucideAngularModule, FileIcon } from 'lucide-angular';
import { Router } from '@angular/router';
import { HeaderComponent } from "../../components/header/header.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgOptimizedImage, LucideAngularModule, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(
    private router: Router
  ) {

  }
  readonly FileIcon = FileIcon;
  @Output("navigate") onNavigate = new EventEmitter();
  @Output("navigater") onNavigater = new EventEmitter();

  navigate() {
    this.router.navigate(["/login"])
  }

  navigater() {
    this.router.navigate(["/registrar"])
  }
}
