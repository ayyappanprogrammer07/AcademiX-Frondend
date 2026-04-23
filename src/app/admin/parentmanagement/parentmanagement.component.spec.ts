import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentmanagementComponent } from './parentmanagement.component';

describe('ParentmanagementComponent', () => {
  let component: ParentmanagementComponent;
  let fixture: ComponentFixture<ParentmanagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParentmanagementComponent]
    });
    fixture = TestBed.createComponent(ParentmanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
