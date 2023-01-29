import { TestBed } from '@angular/core/testing';

import { StuffResolver } from './stuff.resolver';

describe('StuffResolver', () => {
  let resolver: StuffResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(StuffResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
