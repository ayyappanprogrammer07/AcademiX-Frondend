import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticeboardmanagementComponent } from './noticeboardmanagement.component';

describe('NoticeboardmanagementComponent', () => {
  let component: NoticeboardmanagementComponent;
  let fixture: ComponentFixture<NoticeboardmanagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoticeboardmanagementComponent]
    });
    fixture = TestBed.createComponent(NoticeboardmanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
