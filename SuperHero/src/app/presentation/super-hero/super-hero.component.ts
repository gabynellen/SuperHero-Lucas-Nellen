import { Component, ViewChild } from '@angular/core';
import { SuperHeroModel } from '@models';
import {
  GetAllSuperHeroUsecase,
  PostSuperHeroUsecase,
  PutSuperHeroUsecase,
} from '@useCases';
import { MatButtonModule } from '@angular/material/button';
import { GridComponent } from '../organism/grid/grid.component';
import { PageEvent } from '@angular/material/paginator';
import { PaginatorComponent } from '../organism/paginator/paginator.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog } from '@angular/material/dialog';
import { SuperFormComponent } from '../organism/dialogs/super-form/super-form.component';
import { AceptDialogComponent } from '../organism/dialogs/acept-dialog/acept-dialog.component';
import { LoadingService } from '../layout/loading/service/loading.service';
import { DeleteSuperHeroUsecase } from 'src/app/domain/usecases/delete-super-hero.usecase';

@Component({
  selector: 'app-super-hero',
  standalone: true,
  imports: [
    MatButtonModule,
    GridComponent,
    PaginatorComponent,
    MatInputModule,
    MatFormFieldModule,
  ],
  templateUrl: './super-hero.component.html',
  styleUrl: './super-hero.component.scss',
})
export class SuperHeroComponent {
  @ViewChild('paginator') paginator!: PaginatorComponent;
  supers = Array<SuperHeroModel>();
  allSupers = Array<SuperHeroModel>();
  pageindex = 0;

  constructor(
    private getAllSuperHeroUsecase: GetAllSuperHeroUsecase,
    private putSuperHeroUsecase: PutSuperHeroUsecase,
    private postSuperHeroUsecase: PostSuperHeroUsecase,
    private deleteSuperHeroUsecase: DeleteSuperHeroUsecase,
    private loadingService: LoadingService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getAllSuperHeroUsecase.execute().subscribe((data) => {
      this.allSupers.push(data);
      this.supers = this.allSupers.slice(0, 5);
    });
  }

  loadSupers(e: PageEvent) {
    this.pageindex = e.pageIndex;
    this.supers = this.allSupers.slice(
      e.pageIndex * e.pageSize,
      (e.pageIndex + 1) * e.pageSize
    );
  }

  filterSupers(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (filterValue !== '') {
      this.supers = this.allSupers
        .filter(
          (superHero) =>
            superHero.id.toLowerCase().includes(filterValue.toLowerCase()) ||
            superHero.name.toLowerCase().includes(filterValue.toLowerCase()) ||
            superHero.nickName.toLowerCase().includes(filterValue.toLowerCase())
        )
        .slice(0, 5);
    } else {
      this.supers = this.allSupers.slice(0, 5);
    }
  }

  createEditSuper(action: string, superHero?: SuperHeroModel) {
    const dialogRef = this.dialog.open(SuperFormComponent, {
      height: '350px',
      width: '450px',
      disableClose: true,
      data: {
        superHero: superHero
          ? superHero
          : { id: null, name: '', nickName: '', power: '' },
        action: action,
      },
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.loadingService.show();
        setTimeout(() => {
          if (action === 'crear') {
            const result = this.postSuperHeroUsecase.execute(
              res.superHero,
              this.allSupers
            );
            this.supers = result;
          } else {
            const result = this.putSuperHeroUsecase.execute(
              res.superHero,
              this.allSupers
            );
            this.supers = result;
          }
          if (this.pageindex !== 0) this.paginator.firstPage();
          this.loadingService.hide();
        }, 2000);
      }
    });
  }

  deleteElement(superHero: SuperHeroModel) {
    const dialogRef = this.dialog.open(AceptDialogComponent, {
      width: '450px',
      disableClose: true,
      data: {
        superHero: superHero,
      },
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.loadingService.show();
        setTimeout(() => {
          const result = this.deleteSuperHeroUsecase.execute(
            superHero.id,
            this.allSupers
          );
          this.allSupers = result;
          this.supers = this.allSupers.slice(0, 5);
          if (this.pageindex !== 0) this.paginator.firstPage();
          this.loadingService.hide();
        }, 2000);
      }
    });
  }
}
