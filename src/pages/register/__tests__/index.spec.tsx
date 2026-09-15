import '@testing-library/jest-dom';
import { expect, it, describe } from '@rstest/core';
import { render, fireEvent, screen } from '@lynx-js/react/testing-library';
import { MemoryRouter, Route, Routes } from 'react-router';

import { Register } from '../index.js';
import { Login } from '../../login/index.js';

function renderRegister() {
  return render(
    <MemoryRouter initialEntries={['/register']}>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </MemoryRouter>,
  );
}

describe('Register', () => {
  it('renders the heading, fields and submit button', () => {
    renderRegister();

    expect(screen.getByText('Create an account')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Nguyen Van A')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('you@example.com')).toBeInTheDocument();
    expect(screen.getByText('Create account')).toBeInTheDocument();
  });

  it('shows validation errors when submitting an empty form', () => {
    renderRegister();

    fireEvent.tap(screen.getByText('Create account'));

    expect(screen.getByText('Enter your name')).toBeInTheDocument();
    expect(screen.getByText('Enter a valid email address')).toBeInTheDocument();
    expect(
      screen.getByText('Please accept the terms to continue'),
    ).toBeInTheDocument();
  });

  it('toggles the terms checkbox and clears the terms error', () => {
    renderRegister();

    // Accept the terms, then submit — the terms error must not appear.
    fireEvent.tap(screen.getByText('Terms'));
    fireEvent.tap(screen.getByText('Create account'));

    expect(screen.queryByText('Please accept the terms to continue')).toBeNull();
    // Other validations still fire for the empty fields.
    expect(screen.getByText('Enter your name')).toBeInTheDocument();
  });

  it('navigates to Login when the sign-in link is tapped', () => {
    renderRegister();

    fireEvent.tap(screen.getByText('Sign in'));

    expect(screen.getByText('Welcome back')).toBeInTheDocument();
  });
});
