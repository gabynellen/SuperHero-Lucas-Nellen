import { SuperHeroModel } from '@models';
import { Observable } from 'rxjs';

export abstract class SuperHeroRepository {
  abstract getSuperHeroById(id: number): Observable<SuperHeroModel>;
  abstract getAllSuperHeros(): Observable<SuperHeroModel>;
  abstract putSuperHero(
    superEdit: SuperHeroModel,
    allSupers: SuperHeroModel[]
  ): SuperHeroModel[];
  abstract postSuperHero(
    superadd: SuperHeroModel,
    allSupers: SuperHeroModel[]
  ): SuperHeroModel[];
  abstract deleteSuperHero(
    idSuperDelete: string,
    allSupers: SuperHeroModel[]
  ): SuperHeroModel[];
}
