import { TestBed } from '@angular/core/testing';

import { WishServiceService } from './wish-service.service';

describe('WishServiceService', () => {
  let service: WishServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WishServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
