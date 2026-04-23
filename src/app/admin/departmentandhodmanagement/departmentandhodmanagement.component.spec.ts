import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentandhodmanagementComponent } from './departmentandhodmanagement.component';

describe('DepartmentandhodmanagementComponent', () => {
  let component: DepartmentandhodmanagementComponent;
  let fixture: ComponentFixture<DepartmentandhodmanagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DepartmentandhodmanagementComponent]
    });
    fixture = TestBed.createComponent(DepartmentandhodmanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
