import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamandmarksmanagementComponent } from './examandmarksmanagement.component';

describe('ExamandmarksmanagementComponent', () => {
  let component: ExamandmarksmanagementComponent;
  let fixture: ComponentFixture<ExamandmarksmanagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExamandmarksmanagementComponent]
    });
    fixture = TestBed.createComponent(ExamandmarksmanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
