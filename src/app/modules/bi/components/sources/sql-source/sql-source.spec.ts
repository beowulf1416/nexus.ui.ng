import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SqlSource } from './sql-source';

describe('SqlSource', () => {
  let component: SqlSource;
  let fixture: ComponentFixture<SqlSource>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SqlSource]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SqlSource);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
