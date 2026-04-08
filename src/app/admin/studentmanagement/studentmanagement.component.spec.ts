import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentmanagementComponent } from './studentmanagement.component';

describe('StudentmanagementComponent', () => {
  let component: StudentmanagementComponent;
  let fixture: ComponentFixture<StudentmanagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentmanagementComponent]
    });
    fixture = TestBed.createComponent(StudentmanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
