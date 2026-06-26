import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonDialog } from './person-dialog';

describe('PersonDialog', () => {
  let component: PersonDialog;
  let fixture: ComponentFixture<PersonDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(PersonDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
