import { Injectable } from '@angular/core';
import { SuperHeroRepository } from '@repositories';
import { SuperHeroModel } from '@models';

@Injectable({
  providedIn: 'root',
})
export class DeleteSuperHeroUsecase {
  constructor(private superHeroRepository: SuperHeroRepository) {}

  execute(superEdit: string, allSupers: SuperHeroModel[]): SuperHeroModel[] {
    return this.superHeroRepository.deleteSuperHero(superEdit, allSupers);
  }
}
