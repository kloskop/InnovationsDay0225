import { TestBed } from '@angular/core/testing';

import { FcmMobileService } from './fcm-mobile.service';

describe('FcmMobileService', () => {
  let service: FcmMobileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FcmMobileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
