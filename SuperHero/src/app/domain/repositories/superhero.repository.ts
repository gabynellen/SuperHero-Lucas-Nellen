import { Observable } from 'rxjs';
import { SuperHeroModel } from '../models';

export abstract class SuperHeroRepository {
  abstract getSuperHeroById(id: number): Observable<SuperHeroModel>;
  abstract getAllSuperHeros(): Observable<SuperHeroModel>;
}
