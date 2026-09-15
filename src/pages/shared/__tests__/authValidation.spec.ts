import { expect, it, describe } from '@rstest/core';

import {
  validateLogin,
  validateRegister,
  hasErrors,
  type RegisterValues,
} from '../authValidation.js';

const validRegister: RegisterValues = {
  name: 'Nguyen Van A',
  email: 'user@example.com',
  password: 'secret123',
  confirm: 'secret123',
  agreed: true,
};

describe('validateLogin', () => {
  it('returns no errors for valid credentials', () => {
    expect(validateLogin('user@example.com', 'secret123')).toEqual({});
  });

  it('flags an invalid email', () => {
    expect(validateLogin('not-an-email', 'secret123').email).toBe(
      'Enter a valid email address',
    );
  });

  it('flags a short password', () => {
    expect(validateLogin('user@example.com', '123').password).toBe(
      'Password must be at least 6 characters',
    );
  });
});

describe('validateRegister', () => {
  it('returns no errors for a fully valid form', () => {
    expect(validateRegister(validRegister)).toEqual({});
  });

  it('requires a name', () => {
    expect(validateRegister({ ...validRegister, name: '   ' }).name).toBe(
      'Enter your name',
    );
  });

  it('requires a valid email', () => {
    expect(validateRegister({ ...validRegister, email: 'bad' }).email).toBe(
      'Enter a valid email address',
    );
  });

  it('requires a long-enough password', () => {
    expect(validateRegister({ ...validRegister, password: '123' }).password).toBe(
      'Password must be at least 6 characters',
    );
  });

  it('requires the confirmation to match', () => {
    expect(
      validateRegister({ ...validRegister, confirm: 'different' }).confirm,
    ).toBe('Passwords do not match');
  });

  it('requires accepting the terms', () => {
    expect(validateRegister({ ...validRegister, agreed: false }).terms).toBe(
      'Please accept the terms to continue',
    );
  });
});

describe('hasErrors', () => {
  it('is false for an empty object', () => {
    expect(hasErrors({})).toBe(false);
  });

  it('is true when any error is present', () => {
    expect(hasErrors({ email: 'x' })).toBe(true);
  });
});
