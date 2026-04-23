import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportmanagementComponent } from './transportmanagement.component';

describe('TransportmanagementComponent', () => {
  let component: TransportmanagementComponent;
  let fixture: ComponentFixture<TransportmanagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransportmanagementComponent]
    });
    fixture = TestBed.createComponent(TransportmanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
