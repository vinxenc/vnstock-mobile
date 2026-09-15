import '@testing-library/jest-dom';
import { expect, it, describe } from '@rstest/core';
import { render, fireEvent, screen } from '@lynx-js/react/testing-library';
import { MemoryRouter, Route, Routes } from 'react-router';

import { Home } from './Home.js';
import { About } from './About.js';

function renderHome() {
  return render(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </MemoryRouter>,
  );
}

describe('Home', () => {
  it('renders the brand, tagline and action button', () => {
    renderHome();

    expect(screen.getByText('VNStock')).toBeInTheDocument();
    expect(
      screen.getByText('Vietnamese market data, on Lynx'),
    ).toBeInTheDocument();
    expect(screen.getByText('About this app')).toBeInTheDocument();
  });

  it('navigates to the About page when the button is tapped', () => {
    renderHome();

    fireEvent.tap(screen.getByText('About this app'));

    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Go back')).toBeInTheDocument();
  });
});
