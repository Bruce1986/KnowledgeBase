import { sanitizeFilename } from './utils.js';

describe('sanitizeFilename', () => {
  test.each([
    { input: 'a:/b?c*', expected: 'a_b_c_' },
    { input: 'a valid-filename', expected: 'a valid-filename' },
    { input: '<>:"/\\|?*', expected: '_' },
    { input: 'no-op', expected: 'no-op' },
    { input: '', expected: '' },
  ])('should sanitize "$input" to "$expected"', ({ input, expected }) => {
    expect(sanitizeFilename(input)).toBe(expected);
  });
});
