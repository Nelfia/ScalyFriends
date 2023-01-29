import { TestBed } from '@angular/core/testing';

import { AnimalsResolver } from './animals.resolver';

describe('AnimalsResolver', () => {
  let resolver: AnimalsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(AnimalsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
