import '@testing-library/jest-dom';
import { expect, it, describe } from '@rstest/core';
import { render, fireEvent, screen } from '@lynx-js/react/testing-library';
import { MemoryRouter, Route, Routes } from 'react-router';

import { Home } from './Home.js';
import { About } from './About.js';

function renderAbout() {
  // Start on /about with Home in history so nav(-1) can go back.
  return render(
    <MemoryRouter initialEntries={['/', '/about']} initialIndex={1}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </MemoryRouter>,
  );
}

describe('About', () => {
  it('renders the heading, description and back button', () => {
    renderAbout();

    expect(screen.getByText('About')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Built with ReactLynx and the @lynx-js/lynx-ui component library.',
      ),
    ).toBeInTheDocument();
    expect(screen.getByText('Go back')).toBeInTheDocument();
  });

  it('navigates back when the back button is tapped', () => {
    renderAbout();

    fireEvent.tap(screen.getByText('Go back'));

    expect(screen.getByText('VNStock')).toBeInTheDocument();
    expect(screen.getByText('About this app')).toBeInTheDocument();
  });
});
