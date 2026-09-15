import { defineConfig } from '@rstest/core';
import { withLynxConfig } from '@lynx-js/react/testing-library/rstest-config';

export default defineConfig({
  extends: withLynxConfig(),
  coverage: {
    provider: 'istanbul',
    // Cover all source, except the app entry (side-effect root.render) and types.
    include: ['src/**/*.{ts,tsx}'],
    exclude: ['src/index.tsx', 'src/**/*.d.ts'],
    thresholds: {
      statements: 90,
      branches: 90,
      functions: 90,
      lines: 90,
    },
  },
});
