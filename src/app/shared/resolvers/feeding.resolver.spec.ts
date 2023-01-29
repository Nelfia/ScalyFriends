import { TestBed } from '@angular/core/testing';

import { FeedingResolver } from './feeding.resolver';

describe('FeedingResolver', () => {
  let resolver: FeedingResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(FeedingResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
