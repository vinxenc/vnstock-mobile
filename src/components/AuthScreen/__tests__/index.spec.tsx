import '@testing-library/jest-dom';
import { expect, it, describe } from '@rstest/core';
import { render, screen } from '@lynx-js/react/testing-library';

import { AuthScreen } from '../index.js';

describe('AuthScreen', () => {
  it('renders its children inside the scrollable shell', () => {
    render(
      <AuthScreen>
        <text>Inside the shell</text>
      </AuthScreen>,
    );

    expect(screen.getByText('Inside the shell')).toBeInTheDocument();
  });
});
