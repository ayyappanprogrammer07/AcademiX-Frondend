import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostelmanagementComponent } from './hostelmanagement.component';

describe('HostelmanagementComponent', () => {
  let component: HostelmanagementComponent;
  let fixture: ComponentFixture<HostelmanagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HostelmanagementComponent]
    });
    fixture = TestBed.createComponent(HostelmanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
