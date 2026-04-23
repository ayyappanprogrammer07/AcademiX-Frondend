import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassandsectionmanagementComponent } from './classandsectionmanagement.component';

describe('ClassandsectionmanagementComponent', () => {
  let component: ClassandsectionmanagementComponent;
  let fixture: ComponentFixture<ClassandsectionmanagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClassandsectionmanagementComponent]
    });
    fixture = TestBed.createComponent(ClassandsectionmanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
