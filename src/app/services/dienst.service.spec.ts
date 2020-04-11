import { TestBed } from '@angular/core/testing';

import { DienstService } from './dienst.service';

describe('DienstService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DienstService = TestBed.get(DienstService);
    expect(service).toBeTruthy();
  });
});
