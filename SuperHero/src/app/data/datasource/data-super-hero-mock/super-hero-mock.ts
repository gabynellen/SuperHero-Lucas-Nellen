import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { SuperHeroRepository } from '../../../domain/repositories/superhero.repository';
import { SuperHeroMapper } from '../../mapper/super-hero-mapper';
import { SuperHeroModel } from '../../../domain/models';
import { SuperHeroMockEntity } from '../../entities/super-hero-mock.entity';

@Injectable({
  providedIn: 'root',
})
export class SuperHeroMockRepository extends SuperHeroRepository {
  private mapper = new SuperHeroMapper();

  supers = [
    {
      id: 1,
      name: 'Mr. MockBig',
      power: 'power',
    },
    {
      id: 2,
      name: 'Mrs. MockTootoot',
      power: 'power',
    },
    {
      id: 3,
      name: 'LittleMockToot',
      power: 'power',
    },
  ];

  constructor() {
    super();
  }

  getSuperHeroById(id: number): Observable<SuperHeroModel> {
    return from(this.supers)
      .pipe(filter((elephant: SuperHeroMockEntity) => elephant.id === id))
      .pipe(map(this.mapper.mapFrom));
  }

  getAllSuperHeros(): Observable<SuperHeroModel> {
    return from(this.supers).pipe(map(this.mapper.mapFrom));
  }
}
