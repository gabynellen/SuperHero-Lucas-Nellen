import { Injectable } from '@angular/core';
import { SuperHeroMockRepository } from '../data/datasource/data-super-hero-mock/super-hero-mock';
import { SuperHeroRepository } from '@repositories';

@Injectable({ providedIn: 'root' })
export class provider {
  // ...
}

//addProviders
export const providers = [
  {
    provide: SuperHeroRepository,
    useClass: SuperHeroMockRepository,
  },
];
