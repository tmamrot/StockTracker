import { TestBed, inject } from '@angular/core/testing';

import { RssService } from './rss-service.service';

describe('RssServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RssService]
    });
  });

  it('should be created', inject([RssService], (service: RssService) => {
    expect(service).toBeTruthy();
  }));
});
