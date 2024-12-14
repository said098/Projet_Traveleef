import { TestBed } from '@angular/core/testing';

import { AuthCarouselService } from './auth-carousel.service';

describe('AuthCarouselService', () => {
  let service: AuthCarouselService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthCarouselService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
