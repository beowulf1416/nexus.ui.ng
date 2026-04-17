import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Rfp } from './rfp';

describe('Rfp', () => {
  let component: Rfp;
  let fixture: ComponentFixture<Rfp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Rfp]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Rfp);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
