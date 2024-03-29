import { sum } from '@/utils/calculator';

describe('calculator', () => {
  it('using sum function', () => {
    expect(sum(1, 2)).toBe(3);
  });
});
