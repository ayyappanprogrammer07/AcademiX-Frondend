import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffmanagementComponent } from './staffmanagement.component';

describe('StaffmanagementComponent', () => {
  let component: StaffmanagementComponent;
  let fixture: ComponentFixture<StaffmanagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StaffmanagementComponent]
    });
    fixture = TestBed.createComponent(StaffmanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
