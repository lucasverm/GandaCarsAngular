import { TestBed } from '@angular/core/testing';

import { InstellingenService } from './instellingen.service';

describe('InstellingenService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InstellingenService = TestBed.get(InstellingenService);
    expect(service).toBeTruthy();
  });
});
