import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeemanagementComponent } from './feemanagement.component';

describe('FeemanagementComponent', () => {
  let component: FeemanagementComponent;
  let fixture: ComponentFixture<FeemanagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeemanagementComponent]
    });
    fixture = TestBed.createComponent(FeemanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
