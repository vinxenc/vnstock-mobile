import '@lynx-js/preact-devtools';
import '@lynx-js/react/debug';
import { root } from '@lynx-js/react';
import { MemoryRouter, Route, Routes } from 'react-router';

import { App } from '@/App.js';
import { About } from '@/pages/About.js';
import { Home } from '@/pages/Home.js';

root.render(
  <MemoryRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/demo" element={<App />} />
      <Route path="/about" element={<About />} />
    </Routes>
  </MemoryRouter>,
);

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
}
