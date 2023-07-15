import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { placesResolver } from './places.resolver';
import { Observable } from 'rxjs';

describe('placesResolver', () => {
  const executeResolver: ResolveFn<Observable<Record<string, boolean>>> = (...resolverParameters) =>
      TestBed.runInInjectionContext(() => placesResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
