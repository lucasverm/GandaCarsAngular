import { TestBed } from '@angular/core/testing';

import { EffectieveDienstService } from './effectieve-dienst.service';

describe('EffectieveDienstService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EffectieveDienstService = TestBed.get(EffectieveDienstService);
    expect(service).toBeTruthy();
  });
});
