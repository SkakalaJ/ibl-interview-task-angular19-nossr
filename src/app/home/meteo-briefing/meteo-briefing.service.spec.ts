import { TestBed } from '@angular/core/testing';

import { MeteoBriefingService } from './meteo-briefing.service';

describe('MeteoBriefingService', () => {
  let service: MeteoBriefingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MeteoBriefingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
