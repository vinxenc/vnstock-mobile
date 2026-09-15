// Pure, framework-free validation for the auth screens. Kept separate from the
// page components so every branch is unit-testable without a Lynx render.

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const MIN_PASSWORD = 6;

export interface LoginErrors {
  email?: string;
  password?: string;
}

export function validateLogin(email: string, password: string): LoginErrors {
  const errors: LoginErrors = {};
  if (!EMAIL_RE.test(email.trim())) {
    errors.email = 'Enter a valid email address';
  }
  if (password.length < MIN_PASSWORD) {
    errors.password = `Password must be at least ${MIN_PASSWORD} characters`;
  }
  return errors;
}

export interface RegisterValues {
  name: string;
  email: string;
  password: string;
  confirm: string;
  agreed: boolean;
}

export interface RegisterErrors {
  name?: string;
  email?: string;
  password?: string;
  confirm?: string;
  terms?: string;
}

export function validateRegister(values: RegisterValues): RegisterErrors {
  const errors: RegisterErrors = {};
  if (!values.name.trim()) {
    errors.name = 'Enter your name';
  }
  if (!EMAIL_RE.test(values.email.trim())) {
    errors.email = 'Enter a valid email address';
  }
  if (values.password.length < MIN_PASSWORD) {
    errors.password = `Password must be at least ${MIN_PASSWORD} characters`;
  }
  if (values.confirm !== values.password) {
    errors.confirm = 'Passwords do not match';
  }
  if (!values.agreed) {
    errors.terms = 'Please accept the terms to continue';
  }
  return errors;
}

export function hasErrors(errors: object): boolean {
  return Object.keys(errors).length > 0;
}
