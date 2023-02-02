import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalDescriptionComponent } from './animal-description.component';

describe('AnimalDescriptionComponent', () => {
  let component: AnimalDescriptionComponent;
  let fixture: ComponentFixture<AnimalDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimalDescriptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimalDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
