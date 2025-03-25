import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class provider {
  // ...
}

//addProviders
export const providers = [
  {
    provide: '', //TypeLegalPersonRepository,
    useClass: '', //TypeLegalPersonWebRepository
  },
];
