import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimetablemanagementComponent } from './timetablemanagement.component';

describe('TimetablemanagementComponent', () => {
  let component: TimetablemanagementComponent;
  let fixture: ComponentFixture<TimetablemanagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TimetablemanagementComponent]
    });
    fixture = TestBed.createComponent(TimetablemanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
