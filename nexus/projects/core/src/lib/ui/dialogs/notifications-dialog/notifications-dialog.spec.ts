import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationsDialog } from './notifications-dialog';

describe('NotificationsDialog', () => {
  let component: NotificationsDialog;
  let fixture: ComponentFixture<NotificationsDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationsDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(NotificationsDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
