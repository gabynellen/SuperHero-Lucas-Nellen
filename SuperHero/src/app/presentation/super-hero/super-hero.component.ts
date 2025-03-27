import { Component } from '@angular/core';
import { SuperHeroModel } from '@models';
import { GetAllSuperHeroUsecase } from '@useCases';
import { MatButtonModule } from '@angular/material/button';
import { GridComponent } from '../organism/grid/grid.component';
import { PageEvent } from '@angular/material/paginator';
import { PaginatorComponent } from '../organism/paginator/paginator.component';
import { InputAutocompletarComponent } from '../organism/input-autocompletar/input-autocompletar.component';

@Component({
  selector: 'app-super-hero',
  standalone: true,
  imports: [
    MatButtonModule,
    GridComponent,
    PaginatorComponent,
    InputAutocompletarComponent,
  ],
  templateUrl: './super-hero.component.html',
  styleUrl: './super-hero.component.scss',
})
export class SuperHeroComponent {
  supers = Array<SuperHeroModel>();
  allSupers = Array<SuperHeroModel>();

  constructor(private getAllSuperHeroUsecase: GetAllSuperHeroUsecase) {}

  ngOnInit() {
    this.getAllSuperHeroUsecase.execute().subscribe((data) => {
      this.allSupers.push(data);
      this.supers = this.allSupers.slice(0, 5);
    });
  }

  loadSupers(e: PageEvent) {
    this.supers = this.allSupers.slice(
      e.pageIndex * e.pageSize,
      (e.pageIndex + 1) * e.pageSize
    );
  }

  filterSupers(e: any) {
    debugger;
  }

  deleteElement($event: SuperHeroModel) {
    throw new Error('Method not implemented.');
  }
  editElement($event: SuperHeroModel) {
    throw new Error('Method not implemented.');
  }
}
