import { TestBed } from '@angular/core/testing';

import { VacationItemService } from './vacation-item.service';

describe('VacationItemService', () => {
  let service: VacationItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VacationItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
