import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendacemanagementComponent } from './attendacemanagement.component';

describe('AttendacemanagementComponent', () => {
  let component: AttendacemanagementComponent;
  let fixture: ComponentFixture<AttendacemanagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AttendacemanagementComponent]
    });
    fixture = TestBed.createComponent(AttendacemanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
