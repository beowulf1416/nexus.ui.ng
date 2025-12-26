import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SourcesList } from './sources-list';

describe('SourcesList', () => {
  let component: SourcesList;
  let fixture: ComponentFixture<SourcesList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SourcesList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SourcesList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
