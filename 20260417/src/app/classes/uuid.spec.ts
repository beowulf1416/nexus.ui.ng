import { Uuid } from './uuid';

describe('Uuid', () => {
  it('should create an instance', () => {
    expect(new Uuid()).toBeTruthy();
  });
});
