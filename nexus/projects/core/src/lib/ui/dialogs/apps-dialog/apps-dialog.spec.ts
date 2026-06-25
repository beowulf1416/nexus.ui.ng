import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsDialog } from './apps-dialog';

describe('AppsDialog', () => {
  let component: AppsDialog;
  let fixture: ComponentFixture<AppsDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppsDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(AppsDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
