import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SuperHeroModel } from '@models';
import e from 'express';

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatButtonModule],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss',
})
export class GridComponent {
  @Input() dataSource!: SuperHeroModel[];
  displayedColumns: string[] = ['id', 'name', 'alias', 'power', 'actions'];

  @Output() editElement: EventEmitter<SuperHeroModel> = new EventEmitter();
  @Output() deleteElement: EventEmitter<SuperHeroModel> = new EventEmitter();

  updateSuperHero(superHero: SuperHeroModel) {
    this.editElement.emit(superHero);
  }

  deletaSuperHero(superHero: SuperHeroModel) {
    this.deleteElement.emit(superHero);
  }
}
