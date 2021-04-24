import { TestBed } from '@angular/core/testing';

import { SupermanService } from './superman.service';

describe('SupermanService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SupermanService = TestBed.get(SupermanService);
    expect(service).toBeTruthy();
  });
});
