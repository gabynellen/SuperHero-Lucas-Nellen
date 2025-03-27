import { SuperHeroModel } from '@models';
import { Observable } from 'rxjs';

export abstract class SuperHeroRepository {
  abstract getSuperHeroById(id: number): Observable<SuperHeroModel>;
  abstract getAllSuperHeros(): Observable<SuperHeroModel>;
}
