import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminmainComponent } from './adminmain.component';

describe('AdminmainComponent', () => {
  let component: AdminmainComponent;
  let fixture: ComponentFixture<AdminmainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminmainComponent]
    });
    fixture = TestBed.createComponent(AdminmainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
