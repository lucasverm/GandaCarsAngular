import { TestBed } from '@angular/core/testing';

import { FeestdagenService } from './feestdagen.service';

describe('FeestdagenService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FeestdagenService = TestBed.get(FeestdagenService);
    expect(service).toBeTruthy();
  });
});
