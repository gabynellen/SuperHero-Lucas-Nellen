import { Injectable } from '@angular/core';
import { SuperHeroRepository } from '@repositories';
import { SuperHeroModel } from '@models';

@Injectable({
  providedIn: 'root',
})
export class PostSuperHeroUsecase {
  constructor(private superHeroRepository: SuperHeroRepository) {}

  execute(
    superEdit: SuperHeroModel,
    allSupers: SuperHeroModel[]
  ): SuperHeroModel[] {
    return this.superHeroRepository.postSuperHero(superEdit, allSupers);
  }
}
