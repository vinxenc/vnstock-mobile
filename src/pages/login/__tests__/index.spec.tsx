import '@testing-library/jest-dom';
import { expect, it, describe } from '@rstest/core';
import { render, fireEvent, screen } from '@lynx-js/react/testing-library';
import { MemoryRouter, Route, Routes } from 'react-router';

import { Login } from '../index.js';
import { Register } from '../../register/index.js';

function renderLogin() {
  return render(
    <MemoryRouter initialEntries={['/login']}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </MemoryRouter>,
  );
}

describe('Login', () => {
  it('renders the heading, fields and submit button', () => {
    renderLogin();

    expect(screen.getByText('Welcome back')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('you@example.com')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Enter your password'),
    ).toBeInTheDocument();
    expect(screen.getByText('Sign in')).toBeInTheDocument();
  });

  it('shows validation errors when submitting an empty form', () => {
    renderLogin();

    fireEvent.tap(screen.getByText('Sign in'));

    expect(screen.getByText('Enter a valid email address')).toBeInTheDocument();
    expect(
      screen.getByText('Password must be at least 6 characters'),
    ).toBeInTheDocument();
  });

  it('navigates to Register when the sign-up link is tapped', () => {
    renderLogin();

    fireEvent.tap(screen.getByText('Sign up'));

    expect(screen.getByText('Create an account')).toBeInTheDocument();
  });
});
