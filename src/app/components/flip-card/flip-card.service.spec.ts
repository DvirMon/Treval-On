import { TestBed } from '@angular/core/testing';

import { FlipCardService } from './flip-card.service';

describe('FlipCardService', () => {
  let service: FlipCardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlipCardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
