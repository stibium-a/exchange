import { TestBed } from '@angular/core/testing';

import { GetHttpServiceService } from './get-http-service.service';

describe('GetHttpServiceService', () => {
  let service: GetHttpServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetHttpServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
