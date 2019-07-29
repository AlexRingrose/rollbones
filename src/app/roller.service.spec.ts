import { TestBed } from '@angular/core/testing';

import { RollerService } from './roller.service';

describe('RollerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RollerService = TestBed.get(RollerService);
    expect(service).toBeTruthy();
  });
});
