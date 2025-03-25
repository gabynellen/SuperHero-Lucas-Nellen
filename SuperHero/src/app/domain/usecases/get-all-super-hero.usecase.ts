import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SuperHeroRepository } from '../repositories/superhero.repository';
import { UseCase } from '../../base/use-case';
import { SuperHeroModel } from '../models';

@Injectable({
  providedIn: 'root',
})
export class GetAllSuperHeroUsecase implements UseCase<void, SuperHeroModel> {
  constructor(private superHeroRepository: SuperHeroRepository) {}

  execute(): Observable<SuperHeroModel> {
    return this.superHeroRepository.getAllSuperHeros();
  }
}
