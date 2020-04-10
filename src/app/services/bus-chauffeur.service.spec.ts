import { TestBed } from '@angular/core/testing';

import { BusChauffeurService } from './bus-chauffeur.service';

describe('BusChauffeurService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BusChauffeurService = TestBed.get(BusChauffeurService);
    expect(service).toBeTruthy();
  });
});
