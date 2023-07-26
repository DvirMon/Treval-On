import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { placesGuard } from './places.guard';

describe('placesGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => placesGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
