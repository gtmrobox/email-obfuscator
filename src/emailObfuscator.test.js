// src/emailObfuscator.test.js
import EmailObfuscator from './emailObfuscator';

describe('EmailObfuscator', () => {
  test('should throw error for invalid email', () => {
    expect(() => EmailObfuscator.obfuscate('invalid-email')).toThrow('Invalid email address');
  });

  test('should correctly obfuscate email with base64', () => {
    const result = EmailObfuscator.obfuscate('test@example.com', { encodeType: 'base64' });
    expect(result.encoded).toBe(btoa('test@example.com'));
    expect(result.html).toContain('data-email');
    expect(result.html).toContain('obfuscated-email');
  });

  test('should correctly obfuscate email with hex', () => {
    const result = EmailObfuscator.obfuscate('test@example.com', { encodeType: 'hex' });
    expect(result.encoded).toMatch(/^[0-9a-f]+$/);
  });

  test('should use custom link text', () => {
    const result = EmailObfuscator.obfuscate('test@example.com', { linkText: 'Email Us' });
    expect(result.html).toContain('Email Us');
  });
});