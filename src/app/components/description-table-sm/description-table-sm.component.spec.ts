import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptionTableSmComponent } from './description-table-sm.component';

describe('DescriptionTableSmComponent', () => {
  let component: DescriptionTableSmComponent;
  let fixture: ComponentFixture<DescriptionTableSmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DescriptionTableSmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DescriptionTableSmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
