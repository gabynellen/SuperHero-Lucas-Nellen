import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UseCase } from '../../base/use-case';
import { SuperHeroRepository } from '@repositories';
import { SuperHeroModel } from '@models';

@Injectable({
  providedIn: 'root',
})
export class GetAllSuperHeroUsecase implements UseCase<void, SuperHeroModel> {
  constructor(private superHeroRepository: SuperHeroRepository) {}

  execute(): Observable<SuperHeroModel> {
    return this.superHeroRepository.getAllSuperHeros();
  }
}
