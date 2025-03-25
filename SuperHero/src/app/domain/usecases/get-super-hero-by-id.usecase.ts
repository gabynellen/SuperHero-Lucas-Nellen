import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UseCase } from '../../base/use-case';
import { SuperHeroModel } from '../models';
import { SuperHeroRepository } from '../repositories/superhero.repository';

@Injectable({
  providedIn: 'root',
})
export class GetSuperHeroByIdUsecase
  implements UseCase<number, SuperHeroModel>
{
  constructor(private superHeroRepository: SuperHeroRepository) {}

  execute(params: number): Observable<SuperHeroModel> {
    return this.superHeroRepository.getSuperHeroById(params);
  }
}
