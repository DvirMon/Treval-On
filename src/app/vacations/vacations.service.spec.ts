import { TestBed } from '@angular/core/testing';

import { VacationsService } from './vacations.service';

describe('VacationsService', () => {
  let service: VacationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VacationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
