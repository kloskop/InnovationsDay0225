import { TestBed } from '@angular/core/testing';

import { FcmPWAService } from './fcm-pwa.service';

describe('FcmPWAService', () => {
  let service: FcmPWAService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FcmPWAService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
