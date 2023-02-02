import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedingDescriptionComponent } from './feeding-description.component';

describe('FeedingDescriptionComponent', () => {
  let component: FeedingDescriptionComponent;
  let fixture: ComponentFixture<FeedingDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedingDescriptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeedingDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
