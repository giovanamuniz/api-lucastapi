import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HeaderComponent } from "../header/header.component";

interface Column {
  key: string; 
  label: string; 
}

@Component({
  selector: 'app-lista-items',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './lista-items.component.html',
  styleUrls: ['./lista-items.component.scss']
})
export class ListaItemsComponent {
  constructor(private router: Router) {}

  @Input() placeholderText: string = '';
  @Input() title: string = '';
  @Input() primaryBtnText: string = '';
  @Input() secondaryBtnText: string = '';
  @Input() routePath: string = ''; 
  @Input() columns: Column[] = []; 
  @Input() dados: any[] = [];
  @Output() excluirFn: EventEmitter<number> = new EventEmitter<number>();
  @Output() navigateEvent = new EventEmitter<void>();

  emitNavigate(): void {
    this.navigateEvent.emit();
  }

  navigateToEdit(id: number): void {
    this.router.navigate([`${this.routePath}/${id}`]);
  }

  navigateToCards(): void {
    this.router.navigate(["/cards"])
  }

  onExcluir(id: number): void {
    this.excluirFn.emit(id);
  }
}
