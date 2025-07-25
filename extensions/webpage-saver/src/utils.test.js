import { sanitizeFilename } from './utils.js';

test('sanitizeFilename removes invalid characters', () => {
  const result = sanitizeFilename('a:/b?c*');
  expect(result).toBe('a_b_c_');
});
