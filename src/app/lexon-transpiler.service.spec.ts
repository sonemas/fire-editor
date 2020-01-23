import { TestBed } from '@angular/core/testing';

import { LexonTranspilerService } from './lexon-transpiler.service';

describe('LexonTranspilerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LexonTranspilerService = TestBed.get(LexonTranspilerService);
    expect(service).toBeTruthy();
  });
});
