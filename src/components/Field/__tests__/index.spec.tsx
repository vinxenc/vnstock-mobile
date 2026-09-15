import '@testing-library/jest-dom';
import { expect, it, describe } from '@rstest/core';
import { render, screen } from '@lynx-js/react/testing-library';

import { Field } from '../index.js';

const noop = () => undefined;

describe('Field', () => {
  it('renders the label and placeholder', () => {
    render(
      <Field
        label="Email"
        type="email"
        placeholder="you@example.com"
        bindinput={noop}
      />,
    );

    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('you@example.com')).toBeInTheDocument();
    expect(screen.queryByText('Enter a valid email address')).toBeNull();
  });

  it('shows the inline error when provided', () => {
    render(
      <Field
        label="Email"
        type="email"
        placeholder="you@example.com"
        error="Enter a valid email address"
        bindinput={noop}
      />,
    );

    expect(screen.getByText('Enter a valid email address')).toBeInTheDocument();
  });

  it('renders a label accessory when provided', () => {
    render(
      <Field
        label="Password"
        type="password"
        placeholder="Enter your password"
        accessory={<text className="InlineLink">Forgot?</text>}
        bindinput={noop}
      />,
    );

    expect(screen.getByText('Forgot?')).toBeInTheDocument();
  });
});
